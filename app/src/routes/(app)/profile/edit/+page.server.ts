import { medusa_client } from '$lib/server/medusa';
import { customer_informations_zod } from '$lib/validators/customer/informations';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const get_user = async () => {
		try {
			const user = await medusa_client.customers.retrieve({
				Cookie: `connect.sid=${locals.sid}`
			});

			if (!user) redirect(302, '/auth/login');

			return user.customer;
		} catch (error) {
			console.error('Error getting customer session:', error);
			redirect(302, '/auth/login');
		}
	};

	const get_orders = async () => {
		try {
			const orders = await medusa_client.customers.listOrders(undefined, {
				Cookie: `connect.sid=${locals.sid}`
			});

			return orders.orders;
		} catch (error) {
			console.error('Error getting customer orders:', error);
			return [];
		}
	};

	//settle promises in parallel
	const [user, orders] = await Promise.all([get_user(), get_orders()]);

	const edit_profile = await superValidate(
		{
			first_name: user.shipping_addresses?.[0]?.first_name || '',
			last_name: user.shipping_addresses?.[0]?.last_name || '',
			phone: user.shipping_addresses?.[0]?.phone || '',
			country_code: user.shipping_addresses?.[0]?.country_code || '',
			address_1: user.shipping_addresses?.[0]?.address_1 || '',
			city: user.shipping_addresses?.[0]?.city || '',
			postal_code: user.shipping_addresses?.[0]?.postal_code || '',
			province: user.shipping_addresses?.[0]?.province || '',
			company: user.shipping_addresses?.[0]?.company || ''
		},
		customer_informations_zod
	);

	return {
		user,
		orders,
		forms: {
			edit_profile
		}
	};
}) satisfies PageServerLoad;

export const actions = {
	edit_informations: async ({ request, locals }) => {
		const form = await superValidate(request, customer_informations_zod);
		if (!form.valid) {
			return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation
		}

		if (!locals.sid) return message(form, 'Something went wrong', { status: 500 });

		const {
			first_name,
			last_name,
			company,
			phone,
			address_1,
			address_2,
			city,
			province,
			postal_code,
			country_code
		} = form.data;

		//check if user has an address at first
		const user_address = await medusa_client.customers
			.retrieve({
				Cookie: `connect.sid=${locals.sid}`
			})
			.then((res) => res.customer.shipping_addresses?.[0]);

		if (!user_address) {
			const customer = await medusa_client.customers.addresses.addAddress(
				{
					address: {
						first_name,
						last_name,
						company: company || '',
						phone: phone || '',
						address_1,
						address_2: address_2 || '',
						city,
						province,
						postal_code,
						country_code,
						metadata: {}
					}
				},
				{
					Cookie: `connect.sid=${locals.sid}`
				}
			);

			if (!customer) return message(form, 'Something went wrong', { status: 500 });

			return message(form, 'Profile updated');
		}

		//update address

		const customer = await medusa_client.customers.addresses.updateAddress(
			user_address.id,
			{
				first_name,
				last_name,
				company: company || '',
				phone: phone || '',
				address_1,
				address_2: address_2 || '',
				city,
				province,
				postal_code,
				country_code,
				metadata: {}
			},
			{
				Cookie: `connect.sid=${locals.sid}`
			}
		);

		if (!customer) return message(form, 'Something went wrong', { status: 500 });

		return message(form, 'Profile updated');
	}
} satisfies Actions;
