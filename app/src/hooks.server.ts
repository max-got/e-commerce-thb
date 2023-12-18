import {
	get_customer_cart,
	get_customer_session,
	medusa_health_check
} from '$lib/server/hook.utils';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const REDIRECT_TEMPORARY = 307;

const handle_medusa_request = async (event: RequestEvent) => {
	event.locals.sid = event.cookies.get('sid') || '';

	if (event.locals.sid) {
		const customer = await get_customer_session(event, `connect.sid=${event.locals.sid}`);

		if (!customer) {
			event.locals.sid = '';
		} else {
			event.locals.user = customer;
		}
	}

	event.cookies.set('sid', event.locals.sid, { path: '/' });

	event.locals.cartid = event.cookies.get('cartid') || '';
	const cart = await get_customer_cart(event, `connect.sid=${event.locals.sid}`);
	event.locals.cartid = cart?.id || '';
	event.locals.cart = cart || undefined;

	return event;
};

const PUBLIC_ROUTES = [
	'/access',
	'/maintenance',
	'/imprint',
	'/privacy-policy',
	'/terms-and-conditions'
] as readonly string[];

export const handle: Handle = async ({ event, resolve }) => {
	const is_thb_student = event.cookies.get('is_thb_student');

	if (is_thb_student) {
		const { name } = JSON.parse(is_thb_student) as { has_access: boolean; name: string };
		if (name) {
			event.locals.student = {
				name: name || ''
			};
		}
	}

	const is_maintenance_page = event.url.pathname?.startsWith('/maintenance');
	const is_public_route = PUBLIC_ROUTES.includes(event.url.pathname);

	if (!is_maintenance_page && !is_public_route) {
		if (!(await medusa_health_check())) {
			redirect(REDIRECT_TEMPORARY, '/maintenance');
		}

		if (!is_thb_student) {
			redirect(REDIRECT_TEMPORARY, '/access');
		}

		event = await handle_medusa_request(event);
		return await resolve(event);
	}

	// If the event's URL pathname starts with '/maintenance' and the Medusa health check passes
	if (is_maintenance_page && (await medusa_health_check())) {
		// Redirect to the home page
		redirect(REDIRECT_TEMPORARY, '/');
	}

	const response = await resolve(event);
	return response;
};
