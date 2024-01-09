import { MEDUSA_REGION_ID } from '$env/static/private';
import { is_medusa_error, medusa_client } from '$lib/server/medusa';

import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		cart: locals.cart
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	add: async ({ request, locals, cookies }) => {
		try {
			const data = await request.formData();
			const variantId = data.get('variantId') as string;

			if (!variantId) {
				return fail(500, { message: 'No variant id provided' });
			}

			const cart = locals.cartid
				? await medusa_client.carts.lineItems.create(locals.cartid, {
						variant_id: variantId,
						quantity: 1
				  })
				: await medusa_client.carts.create(
						{
							region_id: MEDUSA_REGION_ID,
							items: [{ variant_id: variantId, quantity: 1 }]
						},
						{ Cookie: `connect.sid=${locals.sid}` }
				  );

			const cartData = cart.cart || cart;

			cookies.set('cartid', cartData.id, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict',
				httpOnly: true,
				secure: true
			});

			locals.cartid = cartData.id;

			return { success: true, cart: cartData };
		} catch (error) {
			if (is_medusa_error(error)) {
				const { code } = error.response.data;
				const user_message =
					code.toUpperCase() === 'INSUFFICIENT_INVENTORY'
						? 'Nicht genügend Lagerbestand'
						: 'Fehler beim Hinzufügen zum Warenkorb';
				return fail(500, { message: user_message });
			}
			return fail(500, { message: 'Could not add item to cart' });
		}
	},

	remove: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const itemId = data.get('item_id') as string;
			const cart = await medusa_client.carts.lineItems.delete(locals.cartid, itemId);
			return { success: true, cart: cart.cart || cart };
		} catch (error) {
			if (is_medusa_error(error)) {
				const { code } = error.response.data;
				return fail(500, { message: code });
			}
			return fail(500, { message: 'Could not remove item from cart' });
		}
	},

	update: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const itemId = data.get('item_id') as string;
			const quantity = parseInt(data.get('quantity') as string);

			if (quantity === 0) {
				const cart = await medusa_client.carts.lineItems.delete(locals.cartid, itemId);
				return { success: true, cart: cart.cart || cart };
			}

			const cart = await medusa_client.carts.lineItems.update(locals.cartid, itemId, { quantity });
			return { success: true, cart: cart.cart || cart };
		} catch (error: unknown) {
			if (is_medusa_error(error)) {
				const { code } = error.response.data;
				return fail(500, { message: code });
			}

			return fail(500, { message: 'Could not update cart' });
		}
	}
};
