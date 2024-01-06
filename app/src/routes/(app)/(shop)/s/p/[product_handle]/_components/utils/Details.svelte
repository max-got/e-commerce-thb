<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { PricedProduct } from '../../utils';

	export let product: PricedProduct;

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
	{#each STATS_TO_SHOW as stat}
		{#if product?.[stat] && filter_null_undefined_empty(product?.[stat])}
			<button
				class="hover:bg-accent-50 group flex w-full flex-row items-center justify-between border-b transition-colors last-of-type:border-none"
				on:click={() => {
					//@ts-expect-error - stat is defined
					copy_to_clipboard(product[stat], stat);
				}}
			>
				<p class="text-sm uppercase">{stat}</p>
				<span class="bg-accent-200 mx-4 h-px flex-1"></span>
				<p class="text-accent-400 group-hover:bg-accent-100 text-sm transition-colors">
					{product[stat]}
				</p>
			</button>
		{/if}
	{/each}
</div>
