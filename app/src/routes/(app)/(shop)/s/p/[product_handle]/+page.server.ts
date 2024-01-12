import { MEDUSA_REGION_ID } from '$env/static/private';
import { medusa_client } from '$lib/server/medusa';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const get_product = async ({ handle }: { handle: string }) => {
	try {
		const product = await medusa_client.products.list({
			handle: handle,
			region_id: MEDUSA_REGION_ID
		});

		return product.products[0];
	} catch (e) {
		//!TODO handle error
		error(404, {
			message: 'Not found'
		});
	}
};

const get_other_products = async ({ handle }: { handle: string }) => {
	try {
		const products = await medusa_client.products.list({
			limit: 4,
			region_id: MEDUSA_REGION_ID
		});

		products.products = products.products.filter((p) => p.handle !== handle);

		return products.products;
	} catch (e) {
		//!TODO handle error
		error(404, {
			message: 'Not found'
		});
	}
};

export const load = (async ({ params, url, untrack }) => {
	const { product_handle } = params;
	untrack(() => url.searchParams.has('variant'));

	return {
		product: await get_product({ handle: product_handle }),
		other_products: get_other_products({ handle: product_handle })
	};
}) satisfies PageServerLoad;
