<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { CustomerInformationsZod } from '$lib/validators/customer/informations';
	import Button from '$lib/components/primitives/Button.svelte';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import { createEventDispatcher } from 'svelte';

	export let form: SuperValidated<CustomerInformationsZod>;
	const edit_done = createEventDispatcher();

	const {
		form: super_form,
		errors,
		enhance,
		constraints,
		delayed
	} = superForm(form, {
		onSubmit: () => {
			$loading = true;
		},
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Bestellinformationen erfolgreich gespeichert', {
						invert: true
					});
					break;
				default:
					toast.error('Bestellinformationen konnten nicht gespeichert werden', {
						invert: true
					});
					break;
			}
			edit_done('edit_done');
			$loading = false;
		}
	});
</script>

<form method="POST" use:enhance action="/profile/edit?/edit_informations" class="grid gap-4">
	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="first_name"
			name="first_name"
			type="text"
			autocomplete="given-name"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.first_name ? 'true' : undefined}
			bind:value={$super_form.first_name}
			{...$constraints.first_name}
		/>
		<label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">Vorname</label
		>
		{#if $errors.first_name}<span class="text-primary text-xs"> {$errors.first_name}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="last_name"
			name="last_name"
			type="text"
			autocomplete="family-name"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.last_name ? 'true' : undefined}
			bind:value={$super_form.last_name}
			{...$constraints.last_name}
		/>
		<label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Nachname</label
		>
		{#if $errors.last_name}<span class="text-primary text-xs"> {$errors.last_name}</span>{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="address_1"
			name="address_1"
			type="text"
			autocomplete="shipping address-line1"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.address_1 ? 'true' : undefined}
			bind:value={$super_form.address_1}
			{...$constraints.address_1}
		/>
		<label for="address_1" class="block text-sm font-medium leading-6 text-gray-900">Adresse</label>
		{#if $errors.address_1}<span class="text-primary text-xs"> {$errors.address_1}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="city"
			name="city"
			type="text"
			autocomplete="shipping address-level2"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.city ? 'true' : undefined}
			bind:value={$super_form.city}
			{...$constraints.city}
		/>
		<label for="city" class="block text-sm font-medium leading-6 text-gray-900">Stadt</label>
		{#if $errors.city}<span class="text-primary text-xs"> {$errors.city}</span>{/if}
	</div>

	<div class="col-span-1 flex flex-col-reverse gap-2">
		<input
			id="province"
			name="province"
			type="text"
			autocomplete="shipping address-level1"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.province ? 'true' : undefined}
			bind:value={$super_form.province}
			{...$constraints.province}
		/>
		<label for="province" class="block text-sm font-medium leading-6 text-gray-900"
			>Bundesland</label
		>
		{#if $errors.province}<span class="text-primary text-xs"> {$errors.province}</span>{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="postal_code"
			name="postal_code"
			type="text"
			autocomplete="shipping postal-code"
			inputmode="numeric"
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			aria-invalid={$super_form.postal_code ? 'true' : undefined}
			bind:value={$super_form.postal_code}
			{...$constraints.postal_code}
		/>
		<label for="postal_code" class="block text-sm font-medium leading-6 text-gray-900"
			>Postleitzahl</label
		>
		{#if $errors.postal_code}<span class="text-primary text-xs"> {$errors.postal_code}</span>{/if}
	</div>

	<div class="col-span-2 flex flex-col-reverse gap-2">
		<input
			id="phone"
			name="phone"
			type="text"
			inputmode="numeric"
			autocomplete="tel"
			aria-invalid={$super_form.phone ? 'true' : undefined}
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			bind:value={$super_form.phone}
			{...$constraints.phone}
		/>
		<label for="phone" class="block text-sm font-medium leading-6 text-gray-900"
			>Telefonnummer</label
		>

		{#if $errors.phone}
			<span class="text-primary text-xs">{$errors.phone}</span>
		{/if}
	</div>

	<p class="col-start-1 col-end-3 row-span-2 gap-2 text-xs">
		Felder die mit <span class="text-primary">*</span> gekennzeichnet sind, sind Pflichtfelder.
		<span class="sr-only"> Bitte füllen Sie alle Pflichtfelder aus. </span>
	</p>
	<div class="col-start-2 flex flex-col gap-2">
		<Button
			class="col-start-2"
			colorway="accent"
			type="submit"
			disabled={$delayed}
			aria-busy={$delayed}
		>
			Aktualisieren
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
