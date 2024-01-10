<script lang="ts">
	import type { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
	import type { ProductVariant } from '@medusajs/medusa/dist/models/product-variant';
	import { toast } from 'svelte-sonner';

	export let product: PricedProduct['variants'][0];
	type DetailsToDict = {
		key: keyof ProductVariant;
		value: string;
	};
	const _STATS_TO_SHOW = [
		{
			key: 'sku',
			value: 'SKU'
		},
		{
			key: 'barcode',
			value: 'Barcode'
		},
		{
			key: 'ean',
			value: 'EAN Nummer'
		},
		{
			key: 'ean',
			value: 'EAN Nummer'
		},
		{
			key: 'upc',
			value: 'UPC Nummer'
		},
		{
			key: 'weight',
			value: 'Gewicht'
		},
		{
			key: 'width',
			value: 'Breite'
		},
		{
			key: 'height',
			value: 'Höhe'
		},
		{
			key: 'id',
			value: 'ID'
		}
	] satisfies DetailsToDict[];

	//! Make a translation object for the product details, sieht schöner aus
	const STATS_TO_SHOW: Array<keyof typeof product> = [
		'sku',
		'barcode',
		'ean',
		'upc',
		'weight',
		'width',
		'height',
		'id'
	];

	const filter_null_undefined_empty = (value: unknown): boolean =>
		value !== null && value !== undefined && value !== '';

	function copy_to_clipboard(text: string, stat: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => toast.info(`${stat.toUpperCase()} in die Zwischenablage kopiert`))
			.catch((err) => toast.error(`Fehler beim Kopieren: ${err}`));
	}
</script>

<div>
	{#each _STATS_TO_SHOW as stat}
		{#if product?.[stat.key] && filter_null_undefined_empty(product?.[stat.key])}
			<button
				class="hover:bg-accent-50 group flex w-full flex-row items-center justify-between border-b transition-colors last-of-type:border-none"
				on:click={() => {
					//@ts-expect-error - stat is defined
					copy_to_clipboard(product[stat.key], stat.value);
				}}
			>
				<p class="text-sm uppercase">{stat.value}</p>
				<span class="bg-accent-200 mx-4 h-px flex-1"></span>
				<p class="text-accent-400 group-hover:bg-accent-100 text-sm transition-colors">
					{product[stat.key]}
				</p>
			</button>
		{/if}
	{/each}
</div>
