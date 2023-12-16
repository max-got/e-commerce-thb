import forgot_password from '$lib/assets/backdrop/auth/forgot_password.jpg?enhanced';
import login from '$lib/assets/backdrop/auth/login.jpg?enhanced';
import register from '$lib/assets/backdrop/auth/register.jpg?enhanced';
import reset_password from '$lib/assets/backdrop/auth/reset_password.jpg?enhanced';
import type { LayoutServerLoad } from './$types';

const AUTH_PREFIX = '/auth' as const;
const AUTH_ROUTES = [
	{
		name: 'Login',
		path: '/login'
	},
	{
		name: 'Registrieren',
		path: '/register'
	},
	{
		name: 'Passwort zurücksetzen',
		path: '/reset-password'
	},
	{
		name: 'Passwort vergessen',
		path: '/forgot-password'
	}
] as const;

export const load = (async ({ url }) => {
	//return the routes, that are not the current route
	const routes = AUTH_ROUTES.filter(({ path }) => path !== url.pathname.replace(AUTH_PREFIX, ''));
	const backdrops = {
		'/auth/login': login,
		'/auth/register': register,
		'/auth/reset-password': reset_password,
		'/auth/forgot-password': forgot_password
	};

	return {
		routes,
		prefix: AUTH_PREFIX,
		backdrop: backdrops[url.pathname as keyof typeof backdrops]
	};
}) satisfies LayoutServerLoad;
