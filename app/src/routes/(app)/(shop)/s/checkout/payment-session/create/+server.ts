import { medusa_client } from '$lib/server/medusa';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.cartid) {
			return json('No cart found', {
				status: 404
			});
		}

		const create_payment_session = await medusa_client.carts.setPaymentSession(locals.cartid, {
			provider_id: 'manual'
		});

		locals.cart = create_payment_session.cart;

		return json({
			success: true,
			cart: create_payment_session.cart
		});
	} catch (error) {
		console.error('Error fetching shipping options:', error);
		return json('Payment session not created');
	}
};
