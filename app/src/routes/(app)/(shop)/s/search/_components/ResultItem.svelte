<script lang="ts">
	import type { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

	export let result: PricedProduct;
	import ArrowRight from '~icons/ph/arrow-right';
</script>

<div class="h-full w-full overflow-hidden">
	<a
		href="/s/p/{result.handle}"
		class="group relative block h-full w-full overflow-hidden rounded-lg"
	>
		<img
			src={result.thumbnail}
			alt=""
			class="aspect-square w-full object-cover transition duration-500 group-hover:opacity-70"
		/>
		<div
			class="to-accent/40 absolute inset-0 bg-gradient-to-b from-transparent to-95% opacity-0 transition-opacity group-hover:opacity-100"
		></div>

		<div
			class="border-accent-300 absolute bottom-0 left-0 right-0 z-20 flex translate-y-8 flex-col items-start justify-end rounded-t-[24px] bg-white/40 px-6 py-2 shadow-[0px_-4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-all group-hover:translate-y-0 group-hover:bg-white/90 group-hover:shadow-lg"
		>
			<h3 class="text-accent text-xl font-extrabold">{result.title}</h3>

			<span
				class="bg-accent mt-1.5 flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
			>
				Shop Now
				<ArrowRight />
			</span>
		</div>
	</a>
</div>
