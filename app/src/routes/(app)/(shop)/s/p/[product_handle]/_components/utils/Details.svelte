<script lang="ts">
	import type { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
	import type { ProductVariant } from '@medusajs/medusa/dist/models/product-variant';

	export let product: PricedProduct['variants'][0];
	type MetadataToDict = {
		key: keyof ProductVariant['metadata'];
		value: string;
	};
	const STATS_TO_SHOW = [
		{
			key: 'gewicht',
			value: 'Gewicht'
		},
		{
			key: 'streben',
			value: 'Streben'
		},
		{
			key: 'spannweite',
			value: 'Spannweite'
		},
		{
			key: 'groesse_geschlossen',
			value: 'Größe geschlossen'
		},
		{
			key: 'verschlussmechanismus',
			value: 'Verschlussmechanismus'
		}
	] satisfies MetadataToDict[];

	const filter_null_undefined_empty = (value: unknown): boolean =>
		value !== null && value !== undefined && value !== '';
</script>

<div>
	{#if product.metadata?.herstellungsmaterialien}
		<p class="prose">
			<!--eslint-disable-next-line svelte/no-at-html-tags-->
			{@html product.metadata?.herstellungsmaterialien}
		</p>
	{/if}
	{#each STATS_TO_SHOW as stat}
		{#if product.metadata?.[stat.key] && filter_null_undefined_empty(product.metadata?.[stat.key])}
			<div
				class="group flex w-full flex-row items-center justify-between border-b transition-colors last-of-type:border-none"
			>
				<p class="text-sm">{stat.value}</p>
				<span class="bg-accent-200 mx-4 h-px flex-1"></span>
				<p class="text-accent-400 text-sm transition-colors">
					{product.metadata?.[stat.key]}
				</p>
			</div>
		{/if}
	{/each}
</div>
