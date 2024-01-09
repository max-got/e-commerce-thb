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

		const shipping_options = await medusa_client.shippingOptions.listCartOptions(locals.cartid);

		return json(shipping_options.shipping_options);
	} catch (error) {
		console.error('Error fetching shipping options:', error);
		return json([]);
	}
};
