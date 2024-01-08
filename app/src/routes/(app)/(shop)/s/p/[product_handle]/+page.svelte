<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import Gallery from './Gallery.svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { queryParam, queryParameters } from 'sveltekit-search-params';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';
	import { format_price } from '$lib/utils/shop';
	import { derived, writable } from 'svelte/store';
	import { inventory_status_store } from './utils';

	import Accordion from './_components/Accordion.svelte';
	import Details from './_components/utils/Details.svelte';

	export let data: PageData;

	let product_title_ref: HTMLHeadingElement;

	const query_parameters = queryParameters<{ variant: string | null }>();

	const variant_query_param = queryParam('variant', {
		encode: (value: string) => value,
		decode: (value: string | null) => (value ? value.toString() : null),
		defaultValue: data.product.variants[0].title?.toLowerCase() || ''
	});

	const selected_variant_id = writable<string>(data.product.variants[0].id || '');
	const selected_variant = derived(selected_variant_id, ($selected_variant_id) => {
		return (
			data.product.variants.find((variant) => variant.id === $selected_variant_id) ||
			data.product.variants[0]
		);
	});

	selected_variant.subscribe(($selected_variant) => {
		if ($selected_variant) {
			variant_query_param.set($selected_variant.title?.toLowerCase() || '');
		}
	});

	let inventory_status = derived(selected_variant, ($selected_variant) =>
		inventory_status_store($selected_variant)
	);

	const add_to_cart: SubmitFunction = async () => {
		$loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(`${data.product.title}`, {
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

	$: price = $selected_variant?.original_price_incl_tax
		? format_price($selected_variant?.original_price_incl_tax)
		: '';

	onMount(() => {
		if ($query_parameters.variant) {
			selected_variant_id.set(
				data.product.variants.find(
					(variant) => variant.title?.toLowerCase() === $query_parameters.variant
				)?.id ||
					data.product.variants[0].id ||
					''
			);
		}
	});
</script>

<section>
	<div class="max-w-layout mx-auto">
		{#if data.product.images}
			<Gallery images={data.product.images} />
		{/if}

		<div
			class="mx-auto px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8"
		>
			<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
				<div class="flex flex-col">
					<div
						class="xs:justify-between xs:flex-row flex w-full items-center gap-2 py-3 [@media(min-width:330px)]:flex-col [@media(min-width:370px)]:flex-row"
					>
						<h1 class="flex flex-col text-3xl font-extrabold" bind:this={product_title_ref}>
							{data.product.title}
							<span
								class="text-secondary-600 text-center text-sm font-light tracking-normal md:text-start"
							>
								{$selected_variant?.title}
							</span>
						</h1>
						<span class="bg-accent mx-4 h-px flex-1"></span>
						<div class="flex flex-col items-center">
							<p class="font-display text-accent text-2xl font-extrabold tabular-nums">
								{price}
							</p>
							<span class="text-accent-400 text-sm font-light tracking-normal">inkl. MwSt.</span>
						</div>
						<p class="{$inventory_status.class_name()} hidden text-center">
							{$inventory_status.text()}
						</p>
					</div>
				</div>
			</div>

			<div class="relative lg:row-span-3 lg:mt-0">
				<form class="sticky top-0" method="POST" action="/s/cart?/add" use:enhance={add_to_cart}>
					<input type="hidden" name="variantId" value={$selected_variant_id} />

					<div>
						<ul class="grid grid-flow-col-dense place-items-center justify-center gap-2">
							{#each data.product.variants as variant (variant.id)}
								<li>
									<input
										type="radio"
										id="product_variant_{variant.id}"
										name="product_variant"
										value={variant.id}
										bind:group={$selected_variant_id}
										checked={$selected_variant_id === variant.id}
										class="peer hidden"
										required
									/>
									<label
										for="product_variant_{variant.id}"
										class="peer-checked:after:border-primary opacity-85 relative grid w-full cursor-pointer place-content-center peer-checked:opacity-100 peer-checked:after:absolute peer-checked:after:inset-0 peer-checked:after:block peer-checked:after:border-2"
									>
										<img src={variant.thumbnail} class="size-full aspect-1 object-cover" alt="" />
									</label>
								</li>
							{/each}
						</ul>
					</div>

					<div class="mt-4 flex flex-col gap-4">
						<div class="flex items-center justify-between gap-2">
							<h3 class="mb-1 text-base font-normal">
								Variante: <span class="font-semibold">{$selected_variant.title}</span>
							</h3>
							<h3 class="mb-1 text-base font-normal">
								Preis: <span class="font-semibold"
									>{$selected_variant?.original_price_incl_tax
										? format_price($selected_variant?.original_price_incl_tax)
										: ''}</span
								>
							</h3>
						</div>

						<Button type="submit" class=" w-full" colorway="accent">In den Warenkorb</Button>
					</div>
				</form>
			</div>

			<div
				class=" lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
			>
				<div class="mt-10 flex flex-col gap-5">
					<Accordion open={true}>
						<span slot="head">Beschreibung</span>
						<span slot="details" class="contents">
							{#if data.product.metadata?.description}
								<div class="prose">
									<!-- eslint-disable-next-line svelte/no-at-html-tags-->
									{@html data.product.metadata.description}
								</div>
							{/if}
						</span>
					</Accordion>

					<Accordion open={true}>
						<span slot="head">Mehr zu diesem Produkt</span>

						<div slot="details" class="[&_p]:leading-relaxed">
							<Details product={$selected_variant} />
						</div>
					</Accordion>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="relative py-6">
	<div
		class="max-w-layout bg-accent relative z-0 mx-auto overflow-hidden rounded-3xl px-4 py-8 text-white [background-image:radial-gradient(circle,_color-mix(in_srgb,theme(colors.accent.DEFAULT),theme(colors.secondary.DEFAULT)_40%)_1px,_rgba(0,_0,_0,_0)_1px)] [background-size:40px_40px] sm:px-6 sm:py-12 lg:px-8"
	>
		<div
			class="absolute inset-0 -z-10 [background:linear-gradient(to_bottom,_theme(colors.accent.DEFAULT/60%),_rgba(255,_255,_255,_0))]"
		></div>

		<header class="text-center">
			<h2 class="text-xl font-bold sm:text-3xl">Ähnliche Produkte</h2>
		</header>
		{#await data.other_products then products}
			{#if products.length > 0}
				<ul class="flex flex-col gap-2 px-2 py-4 md:flex-row">
					{#each products as product}
						<li class=" flex-1 overflow-hidden rounded-lg lg:max-w-none">
							<a href="/s/p/{product.handle}" class="group relative block overflow-hidden">
								<img
									src={product.thumbnail}
									alt=""
									class=" w-full object-cover transition duration-500 group-hover:opacity-70"
								/>
								<div
									class="to-accent/40 absolute inset-0 bg-gradient-to-b from-transparent to-95% opacity-0 transition-opacity group-hover:opacity-100"
								></div>

								<div
									class="border-accent-300 absolute bottom-0 left-0 right-0 z-20 flex translate-y-8 flex-col items-start justify-end rounded-t-[24px] bg-white/40 px-6 py-2 shadow-[0px_-4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-all group-hover:translate-y-0 group-hover:bg-white/90 group-hover:shadow-lg"
								>
									<h3 class="text-accent text-xl font-extrabold">{product.title}</h3>

									<span
										class="bg-accent mt-1.5 flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
									>
										Ansehen
									</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		{/await}
	</div>
</section>
