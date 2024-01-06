<script lang="ts">
	import type { Product } from '@medusajs/medusa';
	export let featured_products: Product[] = [];

	import ArrowRight from '~icons/ph/arrow-right';
</script>

<section class="relative py-6">
	<div
		class="max-w-screen bg-accent relative z-0 mx-auto overflow-hidden rounded-3xl px-4 py-8 text-white [background-image:radial-gradient(circle,_color-mix(in_srgb,theme(colors.accent.DEFAULT),theme(colors.secondary.DEFAULT)_40%)_1px,_rgba(0,_0,_0,_0)_1px)] [background-size:40px_40px] sm:px-6 sm:py-12 lg:px-8"
	>
		<div
			class="absolute inset-0 -z-10 [background:linear-gradient(to_bottom,_theme(colors.accent.DEFAULT/60%),_rgba(255,_255,_255,_0))]"
		></div>

		<header class="text-center">
			<h2 class="text-xl font-bold sm:text-3xl">Entdecke unsere Produkte</h2>

			<p class="mx-auto mt-4 max-w-md text-white">
				Richte deinen Blick auf die Zukunft. Mit unseren Produkten bist du für jedes Wetter
				gewappnet.
			</p>
		</header>

		<ul class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
			{#each featured_products as featured_product}
				<li
					class="overflow-hidden rounded-lg last-of-type:lg:col-span-2 last-of-type:lg:col-start-2 last-of-type:lg:row-span-2 last-of-type:lg:row-start-1"
				>
					<a href="/s/p/{featured_product.handle}" class="group relative block overflow-hidden">
						<img
							src={featured_product.thumbnail}
							alt=""
							class="aspect-square w-full object-cover transition duration-500 group-hover:opacity-70"
						/>
						<div
							class="to-accent/40 absolute inset-0 bg-gradient-to-b from-transparent to-95% opacity-0 transition-opacity group-hover:opacity-100"
						></div>

						<div
							class="border-accent-300 absolute bottom-0 left-0 right-0 z-20 flex translate-y-8 flex-col items-start justify-end rounded-t-[24px] bg-white/40 px-6 py-2 shadow-[0px_-4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-all group-hover:translate-y-0 group-hover:bg-white/90 group-hover:shadow-lg"
						>
							<h3 class="text-accent text-xl font-extrabold">{featured_product.title}</h3>

							<span
								class="bg-accent mt-1.5 flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
							>
								Shop Now
								<ArrowRight />
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
