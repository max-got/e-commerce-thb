import { medusa_client } from '$lib/server/medusa';
import type { Order } from '@medusajs/medusa';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { discount, guest_checkout, shipping_option } from './_validators';

export const load: PageServerLoad = async function ({ locals }) {
	//forms
	const guest_checkout_form = await superValidate(guest_checkout);
	const shipping_options_form = await superValidate(shipping_option);
	const discount_form = await superValidate(discount);

	const get_shipping_options = async () => {
		try {
			const shipping_options = await medusa_client.shippingOptions.listCartOptions(locals.cartid);

			if (!shipping_options.shipping_options.length) {
				return [];
			}

			return shipping_options.shipping_options.sort((a, b) => {
				if (!a.amount || !b.amount) return 0;

				if (a.amount > b.amount) {
					return 1;
				}
				if (a.amount < b.amount) {
					return -1;
				}
				return 0;
			});
		} catch (error) {
			console.error('Error fetching shipping options:', error);
			return [];
		}
	};

	const get_payment_options = async () => {
		try {
			await medusa_client.carts.createPaymentSessions(locals.cartid);
		} catch (error) {
			console.error('Error fetching shipping options:', error);
			return [];
		}
	};

	return {
		user: locals.user,
		cart: locals.cart,
		shipping_options: locals?.cart?.shipping_address ? await get_shipping_options() : [],
		payment_providers: locals?.cart?.shipping_address ? await get_payment_options() : [],
		forms: {
			guest_checkout_form,
			shipping_options_form,
			discount_form
		}
	};
};

export const actions: Actions = {
	complete: async ({ locals, cookies }) => {
		try {
			console.log('COMPLETE');
			const order = await medusa_client.carts.complete(locals.cartid);
			if (!order.data) return fail(400, { success: false });

			cookies.set('cartid', '', {
				path: '/',
				maxAge: 0,
				sameSite: 'strict',
				httpOnly: true,
				secure: true
			});
			locals.cartid = '';
			console.log('ORDER->>>>>>>>', order.data);

			return { success: true, order: order.data as Order };
		} catch (error) {
			return fail(400, { success: false });
		}
	},

	shipping_option: async ({ request, locals }) => {
		console.log('SHIPPING OPTION');
		const form = await superValidate(request, shipping_option);

		if (!form.valid) {
			console.log('NOT VALID');
			return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
		}

		if (!locals.cartid) {
			console.log('NO CART');
			return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
		}

		await medusa_client.carts
			.addShippingMethod(locals.cartid, {
				option_id: form.data.shipping_option
			})
			.catch(() => {
				console.log('ERROR');
				//!TODO: handle error
				return message(form, 'Something went wrong', { status: 500 });
			});

		console.log('ADDED SHIPPING OPTION');
		return message(form, 'Shipping option added');
	},

	guest_checkout: async ({ request, locals, fetch }) => {
		const form = await superValidate(request, guest_checkout);
		try {
			if (!form.valid) {
				return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
			}

			if (!locals.cartid) {
				return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
			}

			const cart = await medusa_client.carts.update(locals.cartid, {
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

			const { shipping_options } = await fetch('/s/checkout/shipping-option', {
				method: 'POST',
				body: JSON.stringify({ option_id: cart.cart.id })
			}).then((res) => res.json());

			if (shipping_options.length === 0) {
				return message(form, 'Keine Versandoptionen gefunden', { status: 500 });
			}

			return message(form, {
				success: true,
				shipping_options
			});
		} catch (error) {
			//!TODO: handle error
			return message(form, 'Something went wrong', { status: 500 });
		}
	},

	add_discount: async ({ request, locals }) => {
		const form = await superValidate(request, discount);

		if (!form.valid) {
			return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
		}

		if (!locals.cartid) {
			return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
		}

		return await medusa_client.carts
			.update(locals.cartid, {
				discounts: [
					{
						code: form.data.discount
					}
				]
			})
			.then(() => {
				return message(form, 'Discount added');
			})
			.catch((err) => {
				if (err.response?.data?.type === 'not_found') {
					return message(form, 'Der Code existiert nicht.', { status: 404 });
				}
				return message(form, 'Something went wrong', { status: 500 });
			});
	}
};
