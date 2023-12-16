<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { login_post_request } from '../_validators';
	import { COMPANY_INFOS } from '$lib/const';

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

<h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4">Login</h3>
<p class="text-lg text-gray-500 mb-10">
	Wenn du bereits ein Konto hast, kannst du dich hier anmelden.
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

	<div class="col-span-6">
		<label for="MarketingAccept" class="flex gap-4">
			<input
				type="checkbox"
				id="MarketingAccept"
				name="marketing_accept"
				class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
			/>

			<span class="text-sm text-gray-700">
				Ich möchte über Angebote und Neuigkeiten per E-Mail informiert werden.
			</span>
		</label>
	</div>

	<div class="col-span-6">
		<p class="text-sm text-gray-500">
			Indem du fortfährst, stimmst du den <a
				href="/terms-and-conditions"
				class="text-gray-700 underline">Nutzungsbedingungen</a
			>
			von {COMPANY_INFOS.name} zu und bestätigst, dass du die
			<a href="/terms-and-conditions" class="text-gray-700 underline">Datenschutzrichtlinie</a> von {COMPANY_INFOS.name}
			gelesen hast und akzeptierst.
		</p>
	</div>

	<div class="col-span-6 sm:flex sm:items-center sm:gap-4">
		<button
			class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
		>
			Login
		</button>

		<p class="mt-4 text-sm text-gray-500 sm:mt-0">
			Du hast noch kein Konto?
			<a href="/auth/register" class="text-gray-700 underline">Registrieren</a>.
		</p>
	</div>
</form>

<style lang="postcss">
	.label {
		@apply block mb-4 text-gray-600;
	}
	.label-text {
		@apply ml-1 mb-2 font-semibold text-sm;
	}
	.input {
		@apply w-full block py-3 px-4 text-sm border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500;
	}
	.invalid {
		@apply block my-2 text-sm text-red-600;
	}
	.button {
		@apply inline-block w-full my-4 py-3 px-5 text-sm font-semibold text-white bg-lime-600 hover:bg-lime-700 rounded-md transition duration-200;
	}
</style>
