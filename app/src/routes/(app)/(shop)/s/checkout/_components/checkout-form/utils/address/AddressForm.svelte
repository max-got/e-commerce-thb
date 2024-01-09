<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { AddressFormZod } from '../../../../_validators';

	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/primitives/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { dev } from '$app/environment';

	export let form_data: SuperValidated<AddressFormZod>;

	const dispatch = createEventDispatcher<{
		success: boolean;
	}>();

	const dispatch_saved = (value: boolean) => {
		dispatch('success', value);
	};

	const { form, errors, enhance, constraints, delayed } = superForm(form_data, {
		onSubmit: () => {
			$loading = true;
		},
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					dispatch_saved(true);
					toast.success('Bestellinformationen erfolgreich gespeichert', {
						invert: true
					});

					break;
				default:
					dispatch_saved(false);
					toast.error('Bestellinformationen konnten nicht gespeichert werden', {
						invert: true
					});
					break;
			}
			$loading = false;
		}
	});

	function prefill_address() {
		if (!dev) return;
		$form.email = 'mustermann@email.de';
		$form.first_name = 'Max';
		$form.last_name = 'Mustermann';
		$form.address_1 = 'Musterstraße 1';
		$form.city = 'Musterstadt';
		$form.province = 'Musterland';
		$form.postal_code = '12345';
	}
</script>

<form method="POST" use:enhance action="?/add_address" class="grid w-full gap-4 self-start">
	<div class="col-span-2 flex flex-col-reverse items-start justify-start gap-2">
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			aria-invalid={$form.email ? 'true' : undefined}
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			bind:value={$form.email}
			{...$constraints.email}
		/>
		<label for="email" class="block text-sm font-medium leading-6">E-Mail Addresse</label>
		{#if $errors.email}
			<span class="text-primary text-xs">{$errors.email}</span>
		{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="phone"
			name="phone"
			type="phone"
			autocomplete="tel"
			aria-invalid={$form.phone ? 'true' : undefined}
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			bind:value={$form.phone}
			{...$constraints.phone}
		/>
		<label for="email" class="block text-sm font-medium leading-6">Telefonnummer</label>
		{#if $errors.phone}
			<span class="text-primary text-xs">{$errors.phone}</span>
		{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="first_name"
			name="first_name"
			type="text"
			autocomplete="given-name"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.first_name ? 'true' : undefined}
			bind:value={$form.first_name}
			{...$constraints.first_name}
		/>
		<label for="first_name" class="block text-sm font-medium leading-6">Vorname</label>
		{#if $errors.first_name}<span class="text-primary text-xs"> {$errors.first_name}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="last_name"
			name="last_name"
			type="text"
			autocomplete="family-name"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.last_name ? 'true' : undefined}
			bind:value={$form.last_name}
			{...$constraints.last_name}
		/>
		<label for="last_name" class="block text-sm font-medium leading-6">Nachname</label>
		{#if $errors.last_name}<span class="text-primary text-xs"> {$errors.last_name}</span>{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="address_1"
			name="address_1"
			type="text"
			autocomplete="shipping address-line1"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.address_1 ? 'true' : undefined}
			bind:value={$form.address_1}
			{...$constraints.address_1}
		/>
		<label for="address_1" class="block text-sm font-medium leading-6">Adresse</label>
		{#if $errors.address_1}<span class="text-primary text-xs"> {$errors.address_1}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="city"
			name="city"
			type="text"
			autocomplete="shipping address-level2"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.city ? 'true' : undefined}
			bind:value={$form.city}
			{...$constraints.city}
		/>
		<label for="city" class="block text-sm font-medium leading-6">Stadt</label>
		{#if $errors.city}<span class="text-primary text-xs"> {$errors.city}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="province"
			name="province"
			type="text"
			autocomplete="shipping address-level1"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.province ? 'true' : undefined}
			bind:value={$form.province}
			{...$constraints.province}
		/>
		<label for="province" class="block text-sm font-medium leading-6">Bundesland</label>
		{#if $errors.province}<span class="text-primary text-xs"> {$errors.province}</span>{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="postal_code"
			name="postal_code"
			type="text"
			autocomplete="shipping postal-code"
			inputmode="numeric"
			class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$form.postal_code ? 'true' : undefined}
			bind:value={$form.postal_code}
			{...$constraints.postal_code}
		/>
		<label for="postal_code" class="block text-sm font-medium leading-6">Postleitzahl</label>
		{#if $errors.postal_code}<span class="text-primary text-xs"> {$errors.postal_code}</span>{/if}
	</div>
	<div class="col-span-2 flex flex-col gap-2">
		<p class="text-right text-sm">
			Felder mit <span class="text-primary">*</span> sind Pflichtfelder.
		</p>

		{#if dev}
			<button class="self-end text-xs underline" on:click|preventDefault={prefill_address}
				>DEV fill</button
			>
		{/if}
		<Button
			class="col-start-2"
			colorway="accent"
			type="submit"
			disabled={$delayed}
			aria-busy={$delayed}
		>
			Speichern und weiter
		</Button>
	</div>
</form>

<style>
	input[required] + label {
		@apply relative;
	}

	input[required] + label::after {
		@apply absolute -top-1 ml-2 text-red-500 content-['*'];
	}
</style>
