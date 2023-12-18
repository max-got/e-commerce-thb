<script lang="ts">
	export let images = [];
</script>

<div
	class="gallery mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
>
	{#if images.length === 1}
		{#each images as img, index}
			<div class="aspect-h-4 aspect-w-3 block overflow-hidden rounded-lg">
				<img
					src={img.url}
					alt="Two each of gray, white, and black shirts laying flat."
					class="h-full w-full object-contain object-center"
				/>
			</div>
		{/each}
	{:else}
		<div class="  overflow-hidden rounded-lg lg:block">
			<img
				src={images[0].url}
				alt="Two each of gray, white, and black shirts laying flat."
				class="h-full w-full object-cover object-center"
			/>
		</div>
		<div class="subgrid hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
			{#each images as img, index}
				{#if index > 0}
					<div>
						<img
							src={img.url}
							alt="Two each of gray, white, and black shirts laying flat."
							class="h-full w-full object-cover object-center"
						/>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<!-- Image gallery -->
<!-- <div
	class="gallery mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
> -->
<!-- content here -->

<!-- {#each images as img, index}
		<div>
			<img
				src={img.url}
				alt="Two each of gray, white, and black shirts laying flat."
				class="h-full w-full object-cover object-center"
			/>
		</div>
	{/each} -->

<!-- <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
		<img
			src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
			alt="Two each of gray, white, and black shirts laying flat."
			class="h-full w-full object-cover object-center"
		/>
	</div>
	<div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
		<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
			<img
				src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
				alt="Model wearing plain black basic tee."
				class="h-full w-full object-cover object-center"
			/>
		</div>
		<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
			<img
				src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
				alt="Model wearing plain gray basic tee."
				class="h-full w-full object-cover object-center"
			/>
		</div>
	</div>
	<div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
		<img
			src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
			alt="Model wearing plain white basic tee."
			class="h-full w-full object-cover object-center"
		/>
	</div> -->
<!-- </div> -->

<style lang="postcss">
	.gallery .subgrid div:nth-child(1) {
		@apply hidden lg:grid lg:grid-cols-1 lg:gap-y-8;
	}

	.gallery .subgrid div:nth-child(2) {
		@apply aspect-h-2 aspect-w-3 overflow-hidden rounded-lg;
	}

	.gallery .subgrid div:nth-child(3) {
		@apply aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg;
	}
</style>
