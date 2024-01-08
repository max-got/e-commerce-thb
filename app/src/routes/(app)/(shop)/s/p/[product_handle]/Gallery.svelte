<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import type { Image } from '@medusajs/medusa';
	export let images: Image[] = [];
</script>

<Splide
	class="bg-accent"
	options={{
		rewind: true,

		perPage: 1,
		gap: 5,
		mediaQuery: 'min',
		breakpoints: {
			'640': {
				perPage: images.length >= 3 ? 3 : images.length,
				gap: 2
			}
		}
	}}
>
	{#each images as img}
		<SplideSlide class="max-h-96">
			<img
				src={img.url}
				class="h-full w-full object-cover lg:object-contain"
				alt="Two each of gray, white, and black shirts laying flat."
			/>
		</SplideSlide>
	{/each}
</Splide>
