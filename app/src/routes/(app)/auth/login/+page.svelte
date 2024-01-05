<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { login_post_request } from '../_validators';
	import { COMPANY_INFOS } from '$lib/const';
	import Button from '$lib/components/primitives/Button.svelte';

	export let data: PageData;

	const {
		form: login_form,
		errors: loginErrors,
		message: loginMessage,
		enhance: loginEnhance
	} = superForm(data.loginForm, {
		validators: login_post_request,
		invalidateAll: true,

		taintedMessage: null
	});

	$login_form.rurl = data.rurl || '';
</script>

<h3 class="text-primary mb-4 text-center text-3xl">Login</h3>
<p class="mb-10 text-center text-lg">
	Melde dich an, um alle Funktionen von {COMPANY_INFOS.name} nutzen zu können.
</p>

<form action="?/login" class="mt-8 grid grid-cols-6 gap-6" method="POST" use:loginEnhance>
	<div class="col-span-6">
		<label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

		<input
			type="email"
			id="Email"
			name="email"
			aria-invalid={$loginErrors.email ? 'true' : undefined}
			bind:value={$login_form.email}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $loginErrors.email}<span class="invalid">{$loginErrors.email}</span>{/if}
	</div>

	<div class="col-span-6">
		<label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>

		<input
			type="password"
			id="Password"
			name="password"
			autocomplete="new-password"
			aria-invalid={$loginErrors.password ? 'true' : undefined}
			bind:value={$login_form.password}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $loginErrors.password}<span class="invalid">{$loginErrors.password}</span>{/if}
		{#if $loginMessage}<div class="mt-2 text-sm text-red-600">{$loginMessage}</div>{/if}
	</div>

	<div class="col-span-6 flex flex-col gap-2 self-end text-right">
		<Button colorway="accent">Login</Button>

		<p class="mt-4 text-sm text-gray-500 sm:mt-0">
			Du hast noch keinen Account?
			<a href="/auth/login" class="text-gray-700 underline">Registrieren</a>.
		</p>
	</div>
</form>
