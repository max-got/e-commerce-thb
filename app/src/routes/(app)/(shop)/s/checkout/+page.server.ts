import { medusa_client } from '$lib/server/medusa';
import type { Order } from '@medusajs/medusa';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { address_form_zod, discount_zod, shipping_option } from './_validators';

export const load: PageServerLoad = async function ({ locals }) {
	//could be in locals.user or in locals.cart
	const current_address_data =
		locals.user?.shipping_addresses?.[0] || locals.cart?.shipping_address;
	const current_email = locals.user?.email || locals.cart?.email;

	const address_form = await superValidate(
		{
			first_name: current_address_data?.first_name || '',
			last_name: current_address_data?.last_name || '',
			email: current_email || '',
			phone: current_address_data?.phone || '',
			country_code: current_address_data?.country_code || '',
			address_1: current_address_data?.address_1 || '',
			city: current_address_data?.city || '',
			postal_code: current_address_data?.postal_code || '',
			province: current_address_data?.province || ''
		},

		address_form_zod,
		{
			errors: false
		}
	);
	const shipping_options_form = await superValidate(shipping_option);
	const discount_form = await superValidate(discount_zod);

	return {
		user: locals.user,
		cart: locals.cart,
		is_logged_in: locals.user !== null,

		forms: {
			shipping_options_form,
			discount_form,
			address_form
		}
	};
};

export const actions: Actions = {
	complete: async ({ locals, cookies }) => {
		try {
			if (!locals.cartid) {
				return fail(404, { success: false });
			}

			const perf_start = performance.now();
			const order = await medusa_client.carts.complete(locals.cartid);
			const perf_end = performance.now();
			console.log('complete order time', `${perf_end - perf_start}ms`);

			cookies.set('cartid', '', {
				path: '/',
				maxAge: 0,
				sameSite: 'strict',
				httpOnly: true,
				secure: true
			});

			locals.cartid = '';

			return { success: true, order: order.data as Order };
		} catch (error) {
			//!TODO: handle error
			console.log('Error completing order', error);

			return fail(400, { success: false });
		}
	},

	add_shipping_option: async ({ request, locals }) => {
		const form = await superValidate(request, shipping_option);
		try {
			if (!form.valid) {
				return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
			}

			if (!locals.cartid) {
				console.log('NO CART');
				return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
			}

			const cart = await medusa_client.carts.addShippingMethod(locals.cartid, {
				option_id: form.data.shipping_option
			});

			locals.cart = cart.cart;

			return message(form, 'Shipping option added');
		} catch (error) {
			//!TODO: handle error
			console.log('Error adding shipping options:', error);

			return message(form, 'Something went wrong', { status: 500 });
		}
	},

	add_address: async ({ request, locals }) => {
		const form = await superValidate(request, address_form_zod);
		try {
			if (!form.valid) {
				return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
			}

			if (!locals.cartid) {
				return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
			}

			const cart = await medusa_client.carts.update(locals.cartid, {
				customer_id: locals.user?.id,
				email: form.data.email,
				country_code: form.data.country_code,
				shipping_address: {
					address_1: form.data.address_1,
					country_code: form.data.country_code,
					city: form.data.city,
					first_name: form.data.first_name,
					last_name: form.data.last_name,
					postal_code: form.data.postal_code,
					province: form.data.province
				}
			});

			locals.cart = cart.cart;

			return message(form, {
				success: true
			});
		} catch (error) {
			//!TODO: handle error
			console.log('Error adding address', error);
			return message(form, 'Something went wrong', { status: 500 });
		}
	},

	add_discount: async ({ request, locals }) => {
		const form = await superValidate(request, discount_zod);
		try {
			if (!form.valid) {
				return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
			}

			if (!locals.cartid) {
				return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
			}

			const cart = await medusa_client.carts.update(locals.cartid, {
				discounts: [
					{
						code: form.data.discount
					}
				]
			});

			locals.cart = cart.cart;

			return message(form, 'Code wurde hinzugefügt.');
		} catch (error) {
			//!TODO: handle error
			console.log('Error adding discount', error);
			//IK, is from medusa
			//Reicht für das Projekt aus, da keine Gutscheincodes mit regeln etc. angewendet werden
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = error as any;
			if (err.response?.data?.type === 'not_found') {
				return message(form, 'Der Code existiert nicht oder ist abgelaufen.', { status: 404 });
			}
			return message(form, 'Something went wrong', { status: 500 });
		}
	},

	delete_discount: async ({ locals }) => {
		try {
			if (!locals.cartid) {
				return fail(404, { success: false });
			}

			const cart = await medusa_client.carts.update(locals.cartid, { discounts: [] });

			locals.cart = cart.cart;

			return { success: true };
		} catch (error) {
			//!TODO: handle error
			console.log('Error deleting discount', error);
			return fail(400, { success: false });
		}
	},

	add_payment_session: async ({ locals }) => {
		try {
			const create_payment_session = await medusa_client.carts.createPaymentSessions(locals.cartid);

			locals.cart = create_payment_session.cart;

			return { success: true };
		} catch (error) {
			console.log('Error creating payment session', error);
			return fail(400, { success: false });
		}
	}
};
