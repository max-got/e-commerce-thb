<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import type { StoreProductsRes } from '@medusajs/medusa';
	import { onMount } from 'svelte';
	export let product: StoreProductsRes['product'];

	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if !mounted}
	<div class="h-[33svh] w-full animate-pulse bg-gray-100 lg:h-[50svh]" />
{:else if product.images}
	<Splide
		options={{
			height: '33svh',
			type: 'loop',
			mediaQuery: 'min',
			breakpoints: {
				'1024': {
					gap: 4,
					height: '50svh',
					perPage: product.images.length >= 2 ? 2 : product.images.length
				}
			},
			classes: {
				arrow: 'splide__arrow your-class-arrow !bg-primary',
				page: 'splide__pagination__page !bg-primary' // each button
			}
		}}
	>
		{#each product.images as img}
			<SplideSlide>
				<img
					src={img.url}
					class=" h-full w-full object-contain md:object-cover lg:object-contain"
					alt={product.title}
				/>
			</SplideSlide>
		{/each}
	</Splide>
{/if}
