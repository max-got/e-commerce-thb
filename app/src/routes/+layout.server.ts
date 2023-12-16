import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		// locals.user and locals.cart are set in hooks.server.js
		user: locals.user,
		cart: locals.cart
	};
}) satisfies LayoutServerLoad;
