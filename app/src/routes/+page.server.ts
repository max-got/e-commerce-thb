import { MEDUSA_REGION_ID, MEDUSA_SALES_CHANNELS_IDS } from '$env/static/private';
import { medusa_client } from '$lib/server/medusa';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('LOAD MAIN');
	const get_products = async () => {
		try {
			const products = await medusa_client.products.list({
				fields: 'id,title,handle,thumbnail',
				limit: 10,
				currency_code: 'eur',
				region_id: MEDUSA_REGION_ID,
				sales_channel_id: [MEDUSA_SALES_CHANNELS_IDS]
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
				expand: 'categories',
				category_id: ['pcat_01HH08EXHS08BYPH79391TDKSJ']
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
