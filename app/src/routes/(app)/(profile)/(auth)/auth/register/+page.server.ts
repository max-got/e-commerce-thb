import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { medusa_sveltekit_client } from '$lib/server/medusa';
import { register_post_request } from '../_validators';

export const load = (async ({ locals, url }) => {
	const rurl = url.searchParams.get('rurl') || '';
	const code = url.searchParams.get('code') || '';
	console.log(rurl);
	if (locals.user) {
		redirect(302, `/${rurl}`);
	}

	const registerForm = await superValidate(register_post_request);

	return {
		rurl,
		code,
		registerForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, register_post_request);
		if (!form.valid) return message(form, 'Something went wrong', { status: 500 }); // this shouldn't happen because of client-side validation

		const user = {
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			email: form.data.email,
			password: form.data.password
		};
		if (await medusa_sveltekit_client.register(locals, cookies, user)) {
			console.log('registered');

			redirect(302, `/${form.data.rurl}`);
		} else {
			console.log('not registered');
			return message(
				form,
				'Wir können dir mit dieser E-Mail Addresse kein Konto erstellen. Bitte versuche es später erneut.',
				{
					status: 403
				}
			);
		}
	}
};
