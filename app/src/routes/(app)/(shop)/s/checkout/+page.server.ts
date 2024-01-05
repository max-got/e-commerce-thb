import { medusa_client } from '$lib/server/medusa';
import type { Order } from '@medusajs/medusa';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { checkout, discount, shipping_option } from './_validators';

export const load: PageServerLoad = async function ({ locals }) {
	//forms
	const checkout_form = await superValidate(
		// {
		// 	first_name: locals.user?.shipping_addresses?.[0]?.first_name || '',
		// 	last_name: locals.user?.shipping_addresses?.[0]?.last_name || '',
		// 	email: locals.user?.email || '',
		// 	phone: locals.user?.shipping_addresses?.[0]?.phone || '',
		// 	country_code: locals.user?.shipping_addresses?.[0]?.country_code || '',
		// 	address_1: locals.user?.shipping_addresses?.[0]?.address_1 || '',
		// 	city: locals.user?.shipping_addresses?.[0]?.city || '',
		// 	postal_code: locals.user?.shipping_addresses?.[0]?.postal_code || '',
		// 	province: locals.user?.shipping_addresses?.[0]?.province || ''
		// },
		{
			first_name: 'Max',
			last_name: 'Mustermann',
			email: 'max.got@mailbox.org',
			address_1: 'Musterstraße 1',
			city: 'Musterstadt',
			postal_code: '12345',
			province: 'Musterland'
		},
		checkout,
		{
			errors: false
		}
	);
	const shipping_options_form = await superValidate(shipping_option);
	const discount_form = await superValidate(discount);

	const get_shipping_options = async () => {
		try {
			const shipping_options = await medusa_client.shippingOptions.listCartOptions(locals.cartid);

			if (!shipping_options.shipping_options.length) {
				return [];
			}
			const ordered_shipping_options = shipping_options.shipping_options.sort((a, b) => {
				if (!a.amount || !b.amount) return 0;

				if (a.amount > b.amount) {
					return 1;
				}

				if (a.amount < b.amount) {
					return -1;
				}
				return 0;
			});

			await medusa_client.carts.addShippingMethod(locals.cartid, {
				option_id: ordered_shipping_options[0].id as string
			});

			return ordered_shipping_options;
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
			checkout_form,
			shipping_options_form,
			discount_form
		}
	};
};

export const actions: Actions = {
	complete: async ({ locals, cookies }) => {
		try {
			const order = await medusa_client.carts.complete(locals.cartid, {
				Cookie: `connect.sid=${locals.sid}`
			});
			if (!order.data) return fail(400, { success: false });

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
			return fail(400, { success: false });
		}
	},

	shipping_option: async ({ request, locals }) => {
		const form = await superValidate(request, shipping_option);

		if (!form.valid) {
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

		return message(form, 'Shipping option added');
	},

	guest_checkout: async ({ request, locals }) => {
		const form = await superValidate(request, checkout);
		try {
			if (!form.valid) {
				return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
			}

			if (!locals.cartid) {
				return message(form, 'Warenkorb konnte nicht gefunden werden.', { status: 404 });
			}

			await medusa_client.carts.update(locals.cartid, {
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

			return message(form, {
				success: true
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
