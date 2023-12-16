import { medusa_sveltekit_client } from '$lib/server/medusa';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
	const get_user = async () => {
		return await medusa_sveltekit_client
			.getCustomer(locals, cookies)
			.then((res) => {
				if (!res) throw new Error('No user found');

				return res;
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.catch((err) => {
				//!TODO error handling
				redirect(302, '/auth/login');
			});
	};

	return {
		user: await get_user()
	};
}) satisfies PageServerLoad;
