import { MEDUSA_BACKEND_URL } from '$env/static/private';
import type { Cart } from '@medusajs/medusa';
import type { RequestEvent } from '@sveltejs/kit';
import { medusa_client } from './medusa';

/** Checks if Medusa is up
 *
 * @returns {Promise<boolean>} - true if Medusa is up, false if not
 */
export const medusa_health_check = async () => {
	try {
		const response = await fetch(`${MEDUSA_BACKEND_URL}/health`);
		if (response.status === 200) {
			return true;
		}
		return false;
	} catch (error) {
		console.error('Error checking Medusa health, ist down?');
		return false;
	}
};

export const get_customer_session = async (
	event: RequestEvent,
	cookie_header: `connect.sid=${string}`
) => {
	try {
		const session = await medusa_client.auth.getSession({
			Cookie: cookie_header
		});

		return session.customer;
	} catch (error) {
		console.error('Error getting customer session:', error);
		return null;
	}
};

export const get_customer_cart = async (
	event: RequestEvent,
	cookie_header: `connect.sid=${string}`
) => {
	try {
		const cartid = event.cookies.get('cartid') || '';
		let cart: Cart | null = null;

		//Wenn cartid vorhanden, dann hole den Cart von Medusa
		if (cartid) {
			cart = await medusa_client.carts.retrieve(cartid).then((res) => res.cart as Cart);

			if (cart && cart.completed_at) {
				cart = null;
			}
		} else if (event.locals.user) {
			cart = await event
				.fetch(`${MEDUSA_BACKEND_URL}/store/customers/me/cart`, {
					headers: {
						Cookie: cookie_header
					}
				})
				.then(async (res) => await res.json())
				.then((res) => res.cart as Cart);

			if (cart) {
				event.locals.cartid = cart.id;
				event.cookies.set('cartid', cart.id, {
					path: '/',
					maxAge: 60 * 60 * 24 * 7,
					sameSite: 'strict',
					httpOnly: true,
					secure: true
				});
			}
		}

		if (event.locals.cartid && !cart) {
			event.locals.cartid = '';
			event.cookies.delete('cartid', { path: '/' });
		}

		return cart;
	} catch (error) {
		console.error('Error getting customer cart:', error);
		return null;
	}
};
