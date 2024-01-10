import { MEDUSA_REGION_ID } from '$env/static/private';
import { medusa_client } from '$lib/server/medusa';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const get_products = async () => {
		try {
			const products = await medusa_client.products.list({
				fields: 'id,title,handle,thumbnail',
				limit: 10,
				currency_code: 'eur',
				region_id: MEDUSA_REGION_ID
			});

			return products.products;
		} catch (error) {
			return [];
		}
	};

	const get_collections = async () => {
		const collections = await medusa_client.collections.list();

		return collections.collections;
	};

	const get_featured_products = async () => {
		try {
			const products = await medusa_client.products.list({
				fields: 'id,title,handle,thumbnail',
				currency_code: 'eur',
				limit: 3,
				region_id: MEDUSA_REGION_ID
			});

			return products.products;
		} catch (error) {
			return [];
		}
	};

	return {
		shop: {
			products: await get_products(),
			collections: await get_collections(),
			featured_products: await get_featured_products()
		},
		locals
	};
}) satisfies PageServerLoad;
