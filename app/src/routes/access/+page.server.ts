import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const has_access = cookies.get('is_thb_student');
	if (has_access) {
		redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;

import type { Actions } from './$types';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const { password, name } = Object.fromEntries(data);
		// wait 100ms to simulate an asynchronous action
		await new Promise((resolve) => setTimeout(resolve, 600));
		const is_valid = password === 'giraffe';

		if (!is_valid) {
			return fail(400, { message: 'Falsches Passwort. Der Zugang ist nur für Studierende der THB.' });
		}

		cookies.set(
			'is_thb_student',
			JSON.stringify({ has_access: true, name: decodeURIComponent(name.toString()) }),
			{
				maxAge: 60 * 60 * 24 * 365,
				path: '/',

				encode: (value) => value
			}
		);

		redirect(303, '/?login=success');
	}
} satisfies Actions;
