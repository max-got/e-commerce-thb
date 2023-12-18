import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { medusa_sveltekit_client } from '$lib/server/medusa';
import { login_post_request } from '../_validators';

export const load = (async ({ locals, url }) => {
	const rurl = url.searchParams.get('rurl') || '';
	const code = url.searchParams.get('code') || '';

	if (locals.user) {
		redirect(302, `/${rurl}`);
	}

	const loginForm = await superValidate(login_post_request, { id: 'login' });

	return {
		rurl,
		code,
		loginForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, login_post_request, { id: 'login' });
		if (!form.valid) return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation

		if (await medusa_sveltekit_client.login(locals, cookies, form.data.email, form.data.password)) {
			redirect(302, `/${form.data.rurl}`);
		} else {
			return message(form, 'Invalid email/password combination', { status: 401 });
		}
	}
};
