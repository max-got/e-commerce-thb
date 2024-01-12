<script lang="ts">
	import type { StoreCustomersRes } from '@medusajs/medusa';

	type ShippingAddress = StoreCustomersRes['customer']['shipping_addresses'][number];
	export let customer: StoreCustomersRes['customer']['shipping_addresses'][number];
	export let email: string;

	//make a structure to render the customer data correctly in the template
	//e.g. first_name last_name in one line, address in the next line...

	//typescript

	type CustomerDict = Record<keyof ShippingAddress, string>;
	const customer_dict = {
		first_name: 'Vorname',
		last_name: 'Nachname',
		address_1: 'Adresse',
		address_2: 'Adresszusatz',
		postal_code: 'Postleitzahl',
		city: 'Stadt',
		province: 'Bundesland',
		country_code: 'Land',
		phone: 'Telefonnummer',
		company: 'Firma',
		country: 'Land'
	} satisfies Partial<CustomerDict>;

	const typecast_to_customer_key = (key: string): keyof Partial<ShippingAddress> => {
		return key as keyof Partial<ShippingAddress>;
	};
</script>

<div class="border-accent relative rounded-2xl border px-4 py-3">
	<div class="flex items-center gap-2">
		<p class="font-display font-bold">
			E-Mail: <span class="font-normal">{email}</span>
		</p>
	</div>
	<div>
		{#each Object.entries(customer_dict) as [key, value]}
			{#if customer[typecast_to_customer_key(key)]}
				<div class="flex items-center gap-2">
					<p class="font-display font-bold">
						{value}: <span class="font-normal">{customer[typecast_to_customer_key(key)]}</span>
					</p>
				</div>
			{/if}
		{/each}
	</div>
</div>
