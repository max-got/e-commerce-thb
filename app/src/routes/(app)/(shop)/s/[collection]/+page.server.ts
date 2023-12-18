import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { collection } = params
	
	
	
	const get_the_product = async ({handle}: {handle:string}) => {

	}

	return {};
}) satisfies PageServerLoad;
