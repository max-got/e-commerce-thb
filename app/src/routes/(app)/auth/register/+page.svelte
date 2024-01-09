<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { register_post_request } from '../_validators';
	import { COMPANY_INFOS } from '$lib/const';
	import Button from '$lib/components/primitives/Button.svelte';

	export let data: PageData;

	const { form, errors, message, enhance } = superForm(data.loginForm, {
		validators: register_post_request,
		invalidateAll: true,

		taintedMessage: null
	});

	$form.rurl = data.rurl || '';
</script>

<h3 class="text-primary mb-4 text-center text-3xl">Registrieren</h3>
<p class="text-accent mb-10 text-center text-lg">
	Hier kannst du dich registrieren, um alle Funktionen von {COMPANY_INFOS.name} nutzen zu können.
</p>

<form action="?/register" class="mt-8 grid grid-cols-6 gap-6" method="POST" use:enhance>
	<div class="col-span-6 lg:col-span-3">
		<label for="first_name" class="block text-sm font-medium text-gray-700">Vorname</label>
		<input
			type="text"
			id="first_name"
			name="first_name"
			aria-invalid={$errors.first_name ? 'true' : undefined}
			bind:value={$form.first_name}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $errors.first_name}<span class="invalid">{$errors.first_name}</span>{/if}
	</div>
	<div class="col-span-6 lg:col-span-3">
		<label for="last_name" class="block text-sm font-medium text-gray-700">Nachname</label>

		<input
			type="text"
			id="last_name"
			name="last_name"
			aria-invalid={$errors.last_name ? 'true' : undefined}
			bind:value={$form.last_name}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $errors.last_name}<span class="invalid">{$errors.last_name}</span>{/if}
	</div>
	<div class="col-span-6">
		<label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

		<input
			type="email"
			id="Email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
	</div>

	<div class="col-span-6">
		<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>

		<input
			type="password"
			id="password"
			name="password"
			autocomplete="new-password"
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
		/>
		{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		{#if $message}<div class="mt-2 text-sm text-red-600">{$message}</div>{/if}
	</div>
	<div class="col-span-6">
		<label for="password_confirm" class="block text-sm font-medium text-gray-700">
			Passwort bestätigen
		</label>

		<input
			name="password_confirm"
			type="password"
			id="password_confirm"
			autocomplete="new-password"
			class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
			aria-invalid={$form.password_confirm ? 'true' : undefined}
			bind:value={$form.password_confirm}
		/>
		{#if $form.password_confirm}<span class="invalid">{$form.password_confirm}</span>{/if}
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

	<div class="col-span-6 flex flex-col gap-2 self-end text-right">
		<Button colorway="accent">Registrieren</Button>

		<p class="mt-4 text-sm text-gray-500 sm:mt-0">
			Du hast bereits ein Konto?
			<a href="/auth/login" class="text-gray-700 underline">Login</a>.
		</p>
	</div>
</form>
