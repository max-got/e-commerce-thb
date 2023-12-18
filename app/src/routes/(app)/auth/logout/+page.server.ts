import { medusa_client } from '$lib/server/medusa';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, cookies }) => {
		const logout = await medusa_client.auth.deleteSession({ 'connect.sid': locals.sid });

		if (logout.response.status === 200) {
			locals.sid = '';
			locals.user = undefined;

			cookies.delete('sid', { path: '/' });
			redirect(302, `/`);
		} else {
			error(500, 'Something went wrong');
		}
	}
} satisfies Actions;
