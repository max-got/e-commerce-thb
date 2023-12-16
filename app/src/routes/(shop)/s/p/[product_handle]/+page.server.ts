import { MEDUSA_REGION_ID, MEDUSA_SALES_CHANNELS_IDS } from '$env/static/private';
import { medusa_sveltekit_client } from '$lib/server/medusa';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals, cookies }) => {
	const { product_handle } = params;

	const get_the_product = async ({ handle }: { handle: string }) => {
		try {
			const product = await medusa_sveltekit_client.getProduct(
				`${handle}&region_id=${MEDUSA_REGION_ID}&sales_channel_id[0]=${MEDUSA_SALES_CHANNELS_IDS}`
			);

			if (!product) {
				throw new Error('Not found');
			}

			return product;
		} catch (e) {
			//!TODO handle error
			error(404, {
				message: 'Not found'
			});
		}
	};

	return {
		product: await get_the_product({ handle: product_handle })
	};
}) satisfies PageServerLoad;
