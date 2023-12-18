<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Address } from '@medusajs/medusa';
	import Button from '$lib/components/primitives/Button.svelte';

	export let shipping_address: Address;
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
	<p>{shipping_address.first_name} {shipping_address.last_name}</p>
	<p>{shipping_address.address_1}</p>
	<p>{shipping_address.city}, {shipping_address.postal_code}</p>
	<p>{shipping_address.country_code?.toUpperCase() ?? ''}</p>
	<p>{email}</p>
	{#if shipping_address.phone}
		<p>{shipping_address.phone}</p>
	{/if}
</div>
