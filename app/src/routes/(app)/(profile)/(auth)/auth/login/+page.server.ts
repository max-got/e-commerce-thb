import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { medusa_client } from '$lib/server/medusa';
import { parse } from 'cookie';
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
		try {
			if (!form.valid) return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation

			const login = await medusa_client.auth.authenticate({
				email: form.data.email,
				password: form.data.password
			});

			if (!login.customer) {
				return message(form, 'Invalid email/password combination', { status: 401 });
			}

			const set_cookie = login.response.headers['set-cookie']?.[0] as string;

			const cookie = parse(set_cookie);

			cookies.set('sid', cookie['connect.sid'], {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'strict',
				httpOnly: true,
				secure: true
			});

			locals.sid = cookie['connect.sid'];
			locals.user = login.customer;

			redirect(302, `/${form.data.rurl}`);
		} catch (error) {
			console.log(error);
		}
	}
};
