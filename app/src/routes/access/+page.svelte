<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/primitives/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	let loading = false;
	export let form: ActionData;

	const login: SubmitFunction = async () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="flex flex-col items-center text-center sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-auto w-64"
			src="https://www.th-brandenburg.de/typo3conf/ext/sb_config7/Resources/Public/Icons/THB_Logo.svg"
			alt="THB Logo"
			width="256"
			height="150"
		/>
		<h2 class="mb-2 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Nicht öffentliche Seite
		</h2>
		<p>
			Diese Seite ist ein Projekt des Moduls "E-Commerce" im Masterstudiengang Wirtschaftsinformatik an
			der <a href="https://www.th-brandenburg.de">Technischen Hochschule Brandenburg</a>.
		</p>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form use:enhance={login} action="?/login" method="POST" class="space-y-6">
			<div class="space-y-4">
				<input id="userName" name="username" autocomplete="username" value="" class="!hidden" />

				<div>
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900">Dein Name</label>

					<input
						id="name"
						name="name"
						type="text"
						autocomplete="given-name"
						required
						placeholder="Max"
						class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Passwort</label
					>

					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
					/>
				</div>
				{#if form?.message}
					<p class="text-primary mt-1 text-center text-xs">{form.message}</p>
				{/if}
			</div>

			<div>
				<Button
					class="ml-auto w-full "
					colorway="accent"
					type="submit"
					disabled={loading}
					aria-busy={loading}>Anmelden</Button
				>
			</div>
			<input hidden type="text" autocomplete="username" value="" class="!hidden" />
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Sie wollen mehr über das Projekt erfahren? Dann
			<a href="https://github.com/max-got" target="_blank"> folgen Sie mir auf GitHub </a>
		</p>
	</div>
</div>

<div class="m-auto flex w-fit gap-4 px-4 py-2">
	<a href="/imprint">Impressum</a>
	<a href="/privacy-policy">Datenschutzerklärung</a>
</div>
