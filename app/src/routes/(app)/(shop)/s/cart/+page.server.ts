import { MEDUSA_REGION_ID } from '$env/static/private';
import { is_medusa_error, medusa_client } from '$lib/server/medusa';
import type { StoreCartsRes } from '@medusajs/medusa';

import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const MAXIMAL_VARIANT_COUNT = 9 as const;

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

			let cart: StoreCartsRes;
			if (locals.cartid) {
				//check if user has already the variant >= 9 times in the cart
				const max_variants_reached = await medusa_client.carts
					.retrieve(locals.cartid)
					.then((res) => {
						const has_in_cart = res.cart.items.filter((item) => item.variant_id === variantId)[0];

						return has_in_cart?.quantity >= MAXIMAL_VARIANT_COUNT;
					});

				if (max_variants_reached) {
					return fail(500, {
						message: `Maximale Anzahl von ${MAXIMAL_VARIANT_COUNT} Stück erreicht. Die anderen wollen auch noch was haben :)`
					});
				}

				cart = await medusa_client.carts.lineItems.create(locals.cartid, {
					variant_id: variantId,
					quantity: 1
				});
			} else {
				cart = await medusa_client.carts.create(
					{
						region_id: MEDUSA_REGION_ID,
						items: [{ variant_id: variantId, quantity: 1 }]
					},
					{ Cookie: `connect.sid=${locals.sid}` }
				);
			}

			const {
				cart: { id }
			} = cart;

			cookies.set('cartid', id, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict',
				httpOnly: true,
				secure: true
			});

			locals.cartid = id;

			return { success: true, cart: cart.cart };
		} catch (error: unknown) {
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
			if (isNaN(quantity)) {
				return fail(500, { message: 'Quantity is not a number' });
			}

			if (quantity > MAXIMAL_VARIANT_COUNT) {
				return fail(500, {
					message: `Maximale Anzahl von ${MAXIMAL_VARIANT_COUNT} Stück erreicht. Die anderen wollen auch noch was haben :)`
				});
			}

			if (quantity === 0) {
				const cart = await medusa_client.carts.lineItems.delete(locals.cartid, itemId);
				return { success: true, cart: cart.cart || cart };
			}

			const cart = await medusa_client.carts.lineItems.update(locals.cartid, itemId, { quantity });
			return { success: true, cart: cart.cart || cart };
		} catch (error: unknown) {
			console.log(error);
			if (is_medusa_error(error)) {
				const { code } = error.response.data;
				return fail(500, { message: code });
			}

			return fail(500, { message: 'Could not update cart' });
		}
	}
};
