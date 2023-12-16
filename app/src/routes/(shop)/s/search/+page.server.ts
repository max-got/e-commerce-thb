import { medusa_client } from '$lib/server/medusa';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ request }) {
	const q = request.url.split('?')?.[1]?.split('=')[1];
	const hits = q
		? await medusa_client.products
				.list({
					q
				})
				.then(({ products }) => products)
		: [];

	return {
		hits
	};
};

export const actions: Actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const q = data.get('q') as string;
		if (!q) {
			return fail(400, { q, missing: true });
		}

		try {
			const hits = await medusa_client.products.list({
				q
			});

			if (hits.count === 0) {
				return fail(404, {
					hits: null
				});
			}

			return {
				success: true,
				hits: hits.products
			};
		} catch (error) {
			return fail(500, { error });
		}
	}
};
