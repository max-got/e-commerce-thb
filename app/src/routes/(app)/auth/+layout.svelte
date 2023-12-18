<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<section class="max-w-layout relative mx-auto">
	<div class="h-full lg:grid lg:grid-cols-12">
		<aside class="bg-accent relative block h-32 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
			<enhanced:img
				src={data.backdrop}
				alt=""
				aria-hidden="true"
				class="absolute inset-0 h-full w-full object-none object-center mix-blend-plus-lighter lg:object-cover"
				loading="eager"
			/>
		</aside>
		<main
			class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
		>
			<div
				class="border-accent-300 elevation-4 max-w-xl rounded-lg border px-6 py-4 text-white lg:max-w-3xl"
			>
				<slot />
			</div>
		</main>
	</div>
</section>
