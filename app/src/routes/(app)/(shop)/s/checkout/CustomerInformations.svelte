<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Address } from '@medusajs/medusa';
	import Button from '$lib/components/primitives/Button.svelte';

	export let address: Address;
	export let email: string;

	const edit = createEventDispatcher();
</script>

<div class="border-accent relative rounded-2xl border px-4 py-3">
	<div class="absolute right-3 top-3">
		<Button
			class="!elevation-0 text-accent px-0 py-0"
			colorway="simple"
			size="xsmall"
			on:click={() => edit('edit')}>Bearbeiten</Button
		>
	</div>
	<p>{address.first_name} {address.last_name}</p>
	<p>{address.address_1}</p>
	<p>{address.city}, {address.postal_code}</p>
	<p>{address.country_code?.toUpperCase() ?? ''}</p>
	<p>{email}</p>
	{#if address.phone}
		<p>{address.phone}</p>
	{/if}
</div>
