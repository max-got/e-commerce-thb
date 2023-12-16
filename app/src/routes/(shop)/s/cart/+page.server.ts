import { medusa_client, medusa_sveltekit_client } from '$lib/server/medusa';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
	return {
		cart: await medusa_sveltekit_client.getCart(locals, cookies)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	add: async ({ request, locals, cookies }) => {
		console.log('ADD TO CART');
		const data = await request.formData();

		const variantId = data.get('variantId') as string;

		if (variantId) {
			const cart = await medusa_sveltekit_client.addToCart(locals, cookies, variantId, 1);

			if (cart) return { success: true, cart };
		}
	},

	remove: async ({ request, locals }) => {
		console.log('---------REMOVE FROM CART------');
		const data = await request.formData();
		const item_id = data.get('item_id') as string;
		const cart = await medusa_sveltekit_client.removeFromCart(locals, item_id);
		if (cart) return { success: true, cart };
	},

	update: async ({ request, locals }) => {
		console.log('UPDATE CART');
		const data = await request.formData();
		const item_id = data.get('item_id') as string;
		console.log('ITEM ID', item_id);
		const quantity = parseInt(data.get('quantity') as string);
		console.log('quantity', quantity);
		if (quantity === 0) {
			const cart = await medusa_sveltekit_client.removeFromCart(locals, item_id);

			if (cart) return { success: true, cart };
		}

		try {
			const cart = await medusa_client.carts.lineItems.update(locals.cartid, item_id, {
				quantity
			});

			if (cart) return { success: true, cart: cart.cart };
		} catch (error: unknown) {
			//@ts-expect-error -- is from medusa
			const response = error?.response;

			if (response?.data?.code) {
				return fail(500, {
					message: response?.data?.code
				});
			}

			return fail(500, {
				message: 'Could not update cart'
			});
		}
	}
};
