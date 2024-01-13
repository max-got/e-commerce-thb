import { medusa_client } from '$lib/server/medusa';
import { fail } from '@sveltejs/kit';
import z from 'zod';
import type { Actions, PageServerLoad } from './$types';

const search_post_request = z.object({
	q: z.string().min(1)
});

function parse_query(query: unknown) {
	const parsed_q = search_post_request.safeParse({ q: query });

	if (!parsed_q.success) {
		return false;
	}
	return parsed_q.data.q;
}

async function searchProducts(query: unknown) {
	const parsed_q = parse_query(query);

	if (!parsed_q) {
		return { hits: [], success: false, error: false };
	}

	try {
		const hits = await medusa_client.products
			.list({
				q: parsed_q
			})
			.then(({ products }) => products);
		return { hits, success: true, error: false };
	} catch (error: unknown) {
		console.error(error); // Log the error for debugging
		return { hits: [], success: false, error: true };
	}
}

export const load: PageServerLoad = async function ({ url, isDataRequest }) {
	const q = url.searchParams.get('q');
	if (isDataRequest) {
		return {
			hits: []
		};
	}

	return await searchProducts(q);
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const q = formData.get('q');
		console.log(q);

		const hits = await searchProducts(q);

		if (hits.success) {
			return hits;
		}

		return hits.error
			? fail(500, { error: 'Search failed' })
			: fail(404, { error: 'Nothing found' });
	}
} satisfies Actions;
