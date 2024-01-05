<script lang="ts">
	import type { Customer, Address } from '@medusajs/medusa';

	type CustomerData = Address;
	export let customer: CustomerData;
	export let email: string;

	//make a structure to render the customer data correctly in the template
	//e.g. first_name last_name in one line, address in the next line...

	//typescript
	type CustomerStructure = Array<Array<keyof NonNullable<CustomerData>>>;

	const customer_structure = [
		['first_name', 'last_name'],
		['address_1'],
		['city', 'postal_code'],
		['country_code'],
		['phone']
	] satisfies CustomerStructure;

	//typecast to index of customerdata

	const typecast = (key: string) => key as keyof CustomerData;
</script>

<div class="border-accent relative rounded-2xl border px-4 py-3">
	<p>{email}</p>

	{#each customer_structure as row}
		<div class="flex flex-row">
			{#each row as field}
				{#if customer[typecast(field)]}
					<p>{customer[typecast(field)]}</p>
					&nbsp;
				{/if}
			{/each}
		</div>
	{/each}
</div>
<!-- 
<div class="border-accent relative rounded-2xl border px-4 py-3">
	<p>{customer.first_name} {customer.last_name}</p>
	<p>{customer.email}</p>
	{#if customer.shipping_addresses.length > 0}
		<h3 class="font-body pt-2 text-base font-medium">Lieferadresse:</h3>
		<p>{customer.shipping_addresses[0].first_name} {customer.shipping_addresses[0].last_name}</p>

		<p>{customer.shipping_addresses[0].address_1}</p>
		<p>{customer.shipping_addresses[0].city}, {customer.shipping_addresses[0].postal_code}</p>
		<p>{customer.shipping_addresses[0].country_code?.toUpperCase() ?? ''}</p>
	{:else}
		<p class="text-primary">Keine Adresse hinterlegt</p>
	{/if}
	{#if customer.phone}
		<p>{customer.phone}</p>
	{/if}
</div> -->
