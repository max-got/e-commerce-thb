<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Gallery from './Gallery.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';
	import { format_price } from '$lib/utils/shop';

	export let data: PageData;

	//create a promise

	const add_to_cart: SubmitFunction = async () => {
		$loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(`${data.product.title}`, {
						position: 'top-center',
						description: ' wurde zum Warenkorb hinzugefügt',
						descriptionClass: '!text-[.6rem]',
						style: 'font-size:.8rem;',
						cancelButtonStyle: 'background:none !important; color:red;',
						action: {
							label: 'Zum Warenkorb',
							onClick: async () => {
								await goto('/s/cart');
							}
						},

						actionButtonStyle: 'background:none !important; color:red;'
					});
					break;

				case 'error':
					toast.error(`${data.product.title}`, {
						position: 'top-center',
						description: ' konnte nicht zum Warenkorb hinzugefügt werden',
						descriptionClass: '!text-[.6rem]',
						style: 'font-size:.8rem;',
						cancelButtonStyle: 'background:none !important; color:red;',
						action: {
							label: 'Schließen',
							onClick: (e) => {
								toast.dismiss(e.detail);
							}
						},

						actionButtonStyle: 'background:none !important; color:red;'
					});
					break;

				case 'failure':
					toast.error(`${data.product.title}`, {
						position: 'top-center',
						description: ' konnte nicht zum Warenkorb hinzugefügt werden',
						descriptionClass: '!text-[.6rem]',
						style: 'font-size:.8rem;',
						cancelButtonStyle: 'background:none !important; color:red;',
						action: {
							label: 'Schließen',
							onClick: (e) => {
								toast.dismiss(e.detail);
							}
						},

						actionButtonStyle: 'background:none !important; color:red;'
					});
					break;
			}

			$loading = false;
			update();
		};
	};

	onMount(() => {});
</script>

<div class="bg-white">
	<div class="pt-6">
		<!-- Image gallery -->
		{#if data.product.images}
			<Gallery images={data.product.images} />
		{/if}

		<!-- Product info -->
		<div
			class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
		>
			<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
				<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
					{data.product.title}
				</h1>
			</div>

			<!-- Options -->
			<div class="mt-4 lg:row-span-3 lg:mt-0">
				<h2 class="sr-only">Product information</h2>
				<p class="text-3xl tracking-tight text-gray-900">
					{format_price(data.product.variants[0].calculated_price_incl_tax)}
				</p>

				<!-- Reviews -->
				<div class="mt-6">
					<h3 class="sr-only">Reviews</h3>
					<div class="flex items-center">
						<div class="flex items-center">
							<!-- Active: "text-gray-900", Default: "text-gray-200" -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-900"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/>
							</svg>
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-900"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/>
							</svg>
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-900"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/>
							</svg>
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-900"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/>
							</svg>
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-200"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<p class="sr-only">4 out of 5 stars</p>
						<a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>117 reviews</a
						>
					</div>
				</div>

				<form class="mt-10" method="POST" action="/s/cart?/add" use:enhance={add_to_cart}>
					<input type="hidden" name="variantId" value={data.product.variants[0].id} />
					<!-- Colors -->
					<div>
						<h3 class="text-sm font-medium text-gray-900">Color</h3>

						<fieldset class="mt-4">
							<legend class="sr-only">Choose a color</legend>
							<div class="flex items-center space-x-3">
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none"
								>
									<input
										type="radio"
										name="color-choice"
										value="White"
										class="sr-only"
										aria-labelledby="color-choice-0-label"
									/>
									<span id="color-choice-0-label" class="sr-only">White</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 rounded-full border border-black border-opacity-10 bg-white"
									></span>
								</label>
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none"
								>
									<input
										type="radio"
										name="color-choice"
										value="Gray"
										class="sr-only"
										aria-labelledby="color-choice-1-label"
									/>
									<span id="color-choice-1-label" class="sr-only">Gray</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-200"
									></span>
								</label>
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none"
								>
									<input
										type="radio"
										name="color-choice"
										value="Black"
										class="sr-only"
										aria-labelledby="color-choice-2-label"
									/>
									<span id="color-choice-2-label" class="sr-only">Black</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-900"
									></span>
								</label>
							</div>
						</fieldset>
					</div>

					<!-- Sizes -->
					<div class="mt-10">
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-medium text-gray-900">Size</h3>
							<a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
						</div>

						<fieldset class="mt-4">
							<legend class="sr-only">Choose a size</legend>
							<div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50 px-4 py-3 text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="XXS"
										disabled
										class="sr-only"
										aria-labelledby="size-choice-0-label"
									/>
									<span id="size-choice-0-label">XXS</span>
									<span
										aria-hidden="true"
										class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
									>
										<svg
											class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
											viewBox="0 0 100 100"
											preserveAspectRatio="none"
											stroke="currentColor"
										>
											<line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
										</svg>
									</span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="XS"
										class="sr-only"
										aria-labelledby="size-choice-1-label"
									/>
									<span id="size-choice-1-label">XS</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="S"
										class="sr-only"
										aria-labelledby="size-choice-2-label"
									/>
									<span id="size-choice-2-label">S</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="M"
										class="sr-only"
										aria-labelledby="size-choice-3-label"
									/>
									<span id="size-choice-3-label">M</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="L"
										class="sr-only"
										aria-labelledby="size-choice-4-label"
									/>
									<span id="size-choice-4-label">L</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="XL"
										class="sr-only"
										aria-labelledby="size-choice-5-label"
									/>
									<span id="size-choice-5-label">XL</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="2XL"
										class="sr-only"
										aria-labelledby="size-choice-6-label"
									/>
									<span id="size-choice-6-label">2XL</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
								<!-- Active: "ring-2 ring-indigo-500" -->
								<label
									class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
								>
									<input
										type="radio"
										name="size-choice"
										value="3XL"
										class="sr-only"
										aria-labelledby="size-choice-7-label"
									/>
									<span id="size-choice-7-label">3XL</span>
									<!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  -->
									<span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
								</label>
							</div>
						</fieldset>
					</div>

					<Button type="submit" class="mt-12 w-full" colorway="accent">Zum Warenkorb hinzufügen</Button>
				</form>
			</div>

			<div
				class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
			>
				<!-- Description and details -->
				<div>
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6">
						<p class="text-base text-gray-900">
							The Basic Tee 6-Pack allows you to fully express your vibrant personality with three
							grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter?
							Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your
							outfit? Our white tee has you covered.
						</p>
					</div>
				</div>

				<div class="mt-10">
					<h3 class="text-sm font-medium text-gray-900">Highlights</h3>

					<div class="mt-4">
						<ul role="list" class="list-disc space-y-2 pl-4 text-sm">
							<li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>
							<li class="text-gray-400">
								<span class="text-gray-600">Dyed with our proprietary colors</span>
							</li>
							<li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
							<li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
						</ul>
					</div>
				</div>

				<div class="mt-10">
					<h2 class="text-sm font-medium text-gray-900">Details</h2>

					<div class="mt-4 space-y-6">
						<p class="text-sm text-gray-600">
							The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our
							subscription service and be the first to get new, exciting colors, like our upcoming
							&quot;Charcoal Gray&quot; limited release.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<pre>{JSON.stringify(data.product, null, 2)}</pre>
