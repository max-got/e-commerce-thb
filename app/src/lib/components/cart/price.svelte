<script lang="ts">
	import { format_price } from '$lib/utils/shop';
	import type { Cart } from '@medusajs/medusa';

	export let cart: Cart;
	export let style: 'cart' | 'checkout' = 'cart';

	const typeCastToNumber = (value: undefined | number) => value as number;
</script>

{#key cart}
	<div class="grid grid-cols-2 gap-2">
		{#if style === 'checkout'}
			<span class="font-normal">Zwischensumme:</span>
			{#if cart.tax_total && cart.subtotal}
				<p class="font-display flex flex-col text-right tracking-normal">
					{format_price(cart.tax_total + cart.subtotal)}
				</p>
			{/if}
			<span class="font-normal">Versandkosten:</span>

			{#if !Number.isNaN(cart.shipping_total) && cart.shipping_methods.length > 0}
				<p class="font-display flex flex-col text-right tracking-normal">
					{format_price(typeCastToNumber(cart.shipping_total))}
				</p>
			{:else if cart.shipping_tax_total && cart.shipping_methods.length > 0}
				<p class="font-display flex flex-col text-right tracking-normal">
					{format_price(typeCastToNumber(cart.shipping_total) + cart.shipping_tax_total)}
				</p>
			{:else}
				<p class="font-display flex flex-col text-right tracking-normal">
					<span class="text-accent-100 text-xs"> Bitte wählen Sie eine Versandoption </span>
				</p>
			{/if}
		{/if}

		{#if cart?.discounts?.length !== 0}
			<span class=" font-normal">Gutscheincodes:</span>
			{#each cart.discounts as discount}
				<p class="font-display my-auto text-end text-xs font-extrabold tracking-normal">
					{discount.code}
					(-{format_price(discount.rule.value)})
				</p>
			{/each}
		{/if}

		<span class="font-extrabold">Gesamt:</span>
		{#if cart.total}
			<p class="font-display flex flex-col text-right font-extrabold tracking-normal">
				{format_price(cart.total)}
			</p>
		{/if}

		<span class="text-accent-100 text-xs">Inklusive Steuern: </span>
		{#if cart.tax_total}
			<p class="!text-accent-100 text-right text-xs">
				{format_price(cart.tax_total)}
			</p>
		{/if}
	</div>
{/key}
