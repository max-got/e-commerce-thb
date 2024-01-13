<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';

	import { queryParam } from 'sveltekit-search-params';
	import { goto } from '$app/navigation';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';
	import { format_price } from '$lib/utils/shop';
	import { derived, writable, type Writable } from 'svelte/store';
	import { inventory_status_store } from './utils';

	import CertUvStandard from '$lib/assets/certificates/uv_standard_801.jpg?enhanced';
	import CertRecycled from '$lib/assets/certificates/C000000_Recycled.png?enhanced';

	import Gallery from './_components/Gallery.svelte';
	import Accordion from './_components/Accordion.svelte';
	import Details from './_components/utils/Details.svelte';
	import Attributes from './_components/utils/Attributes.svelte';
	import { get_cart_count } from '$lib/stores/cart_count';

	export let data: PageData;

	const variant_qp = queryParam('variant', {
		encode: (value) => value.toLowerCase(),
		decode: (value) => value
	});

	function find_variant_by_id(id: string) {
		return data.product.variants.find((variant) => variant.id === id);
	}

	function find_variant_by_title(title: string) {
		return data.product.variants.find(
			(variant) => variant.title?.toLowerCase() === title.toLowerCase()
		);
	}

	let selected_product_id: Writable<string>;
	$: selected_product_id = writable(
		$variant_qp ? find_variant_by_title($variant_qp)?.id : data.product.variants[0].id
	);

	$: selected_product_variant = derived(
		selected_product_id,
		($selected_product_id) => {
			return find_variant_by_id($selected_product_id) || data.product.variants[0];
		},
		data.product.variants[0]
	);

	$: inventory_status = derived(selected_product_variant, ($selected_product_variant) =>
		inventory_status_store($selected_product_variant)
	);

	const current_cart_count = get_cart_count();
	const add_to_cart_helpers = {
		increment: () => {
			current_cart_count.update((count) => count + 1);
		},
		decrement: () => {
			current_cart_count.update((count) => count - 1);
		}
	};

	const add_to_cart: SubmitFunction = async () => {
		$loading = true;
		add_to_cart_helpers.increment();

		return async ({ result, update }) => {
			let error_message: string = `${data.product.title} konnte nicht zum Warenkorb hinzugefügt werden`;
			switch (result.type) {
				case 'success':
					toast.success('Erfolgreich aktualisiert', {
						description: `${data.product.title} (${$selected_product_variant.title}) wurde zum Warenkorb hinzugefügt`,
						action: {
							label: 'Zum Warenkorb',
							onClick: async () => {
								await goto('/s/cart');
							}
						},
						class: /*tw*/ '!w-max !gap-6',
						position: 'bottom-center'
					});
					break;

				case 'error':
					error_message = result?.error?.message;
					toast.error(`${data.product.title}`, {
						description: ` ${result.error} konnte nicht zum Warenkorb hinzugefügt werden`
					});
					add_to_cart_helpers.decrement();
					break;

				case 'failure':
					error_message = result?.data?.message;
					toast.error('Fehler', {
						description: error_message
					});
					add_to_cart_helpers.decrement();
					break;
			}

			$loading = false;
			update({ reset: false });
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const notypecheck = (x: any) => x;
</script>

<section>
	<div class="mx-auto w-full max-w-screen-2xl">
		<div class="bg-accent grid w-full place-items-center">
			{#key data.product}
				<Gallery product={data.product} />
			{/key}
		</div>
	</div>
	<div class="max-w-layout mx-auto">
		<div
			class="mx-auto px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8"
		>
			<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
				<div class="flex flex-col">
					<div
						class="xs:justify-between xs:flex-row flex w-full items-center gap-2 py-3 [@media(min-width:330px)]:flex-col [@media(min-width:370px)]:flex-row"
					>
						<h1 class="flex flex-col text-3xl font-extrabold">
							{data.product.title}
							<span
								class="text-secondary-600 text-center text-sm font-light tracking-normal md:text-start"
							>
								{$selected_product_variant?.title}
							</span>
						</h1>
						<span class="bg-accent mx-4 h-px flex-1"> </span>
						<div class="flex flex-col items-center">
							<p class="font-display text-accent text-2xl font-extrabold tabular-nums">
								{$selected_product_variant.original_price_incl_tax &&
									format_price($selected_product_variant.original_price_incl_tax)}
							</p>
							<span class="text-accent-400 text-sm font-light tracking-normal">inkl. MwSt.</span>
						</div>
					</div>
				</div>
			</div>

			<div class="relative lg:row-span-3 lg:mt-0">
				<form class="sticky top-0" method="POST" action="/s/cart?/add" use:enhance={add_to_cart}>
					<input type="hidden" name="variantId" value={$selected_product_variant.id} />

					<div>
						<ul class="grid grid-flow-col-dense place-items-center justify-center gap-2">
							{#each data.product.variants as variant (variant.id)}
								{@const thumbnail = notypecheck(variant).thumbnail}
								<li>
									<input
										checked={$selected_product_variant.id === variant.id}
										type="radio"
										id="product_variant_{variant.id}"
										name="product_variant"
										bind:group={$selected_product_id}
										on:change={() => {
											//@ts-expect-error -  ja ist theoretisch so aber nicht in medusa :)
											$variant_qp = variant.title;
										}}
										value={variant.id}
										class="peer hidden"
										required
									/>
									<label
										for="product_variant_{variant.id}"
										class="peer-checked:after:border-primary opacity-85 max-w-40 relative grid w-full cursor-pointer place-content-center peer-checked:opacity-100 peer-checked:after:absolute peer-checked:after:inset-0 peer-checked:after:block peer-checked:after:border-2"
									>
										<div
											class="absolute bottom-0 left-0 right-0 grid place-items-center bg-white/60"
										>
											<p class="text-black">
												{variant.title}
											</p>
											<p class="text-black">
												{variant.original_price_incl_tax
													? format_price(variant.original_price_incl_tax)
													: ''}
											</p>
										</div>
										<img src={thumbnail} class="size-full aspect-1 object-cover" alt="" />
									</label>
								</li>
							{/each}
						</ul>
					</div>

					<div class="mt-4 flex flex-col gap-4">
						<div class="flex items-center justify-between gap-2">
							<h3 class="mb-1 text-base font-normal">
								Variante: <span class="font-semibold">{$selected_product_variant.title}</span>
							</h3>

							<h3 class="mb-1 text-base font-normal">
								Preis:
								<span class="font-semibold"
									>{$selected_product_variant?.original_price_incl_tax
										? format_price($selected_product_variant?.original_price_incl_tax)
										: ''}</span
								>
							</h3>
						</div>

						<p class="{$inventory_status.class_name} text-center text-sm">
							{$inventory_status.display_text}
						</p>
						{#if $inventory_status.is_available}
							<Button type="submit" class=" w-full" colorway="accent">In den Warenkorb</Button>
						{:else}
							<Button type="submit" class=" w-full" colorway="white" disabled
								>In den Warenkorb</Button
							>
							<p class="text-center">
								<a href="#" class="text-accent mx-auto text-sm underline"
									>Benachrichtige mich, wenn {data.product.title}
									{$selected_product_variant.title} wieder verfügbar ist</a
								>
							</p>
						{/if}
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
						<span slot="head">Details</span>

						<div slot="details" class="[&_p]:leading-relaxed">
							<Details product={$selected_product_variant} />
						</div>
					</Accordion>

					<Accordion>
						<span slot="head">Mehr zu diesem Produkt</span>

						<div slot="details" class="[&_p]:leading-relaxed">
							<Attributes product={$selected_product_variant} />
						</div>
					</Accordion>
					<Accordion>
						<span slot="head">Support-Kontaktdaten</span>

						<div slot="details" class="flex flex-col gap-2 [&_p]:leading-relaxed">
							<p>
								Unser freundliches Kundensupport-Team steht Ihnen bei allen Fragen rund um unsere
								Produkte zur Verfügung. Ob Sie Informationen zu einem bestimmten Modell benötigen,
								Hilfe bei der Auswahl des richtigen Schirms für Ihre Bedürfnisse wünschen oder
								einfach nur Ratschläge zur Pflege und Wartung suchen – wir sind für Sie da.
								Kontaktieren Sie uns per E-Mail oder telefonisch, und wir werden uns bemühen, Ihre
								Anfragen prompt zu beantworten.
							</p>

							<a href="mailto:customerservice@zenit-gmbh.de">customerservice@zenit-gmbh.de</a>
							<a href="tel:+49 (0) 9876 54321 ">+49 (0) 9876 54321 </a>
						</div>
					</Accordion>
					<Accordion>
						<span slot="head">Reparaturservice?</span>

						<div slot="details" class="flex flex-col gap-2 [&_p]:leading-relaxed">
							<p>
								Selbst die robustesten Regenschirme können gelegentlich eine kleine Auffrischung
								benötigen. Unser erfahrener Reparaturservice steht bereit, um sicherzustellen, dass
								Ihr Schirm wieder in Topform ist. Egal, ob es um einen gebrochenen Stab, ein
								defektes Gestell oder andere Reparaturen geht – wir kümmern uns darum. Senden Sie
								uns einfach Ihren Schirm, und wir werden ihn sorgfältig überprüfen und
								instandsetzen, um sicherzustellen, dass er Sie weiterhin bei jedem Regenschauer
								schützt.
							</p>

							<a href="mailto:customerservice@zenit-gmbh.de">customerservice@zenit-gmbh.de</a>
							<a href="tel:+49 (0) 9876 54321 ">+49 (0) 9876 54321 </a>
						</div>
					</Accordion>
					<Accordion open={true}>
						<span slot="head">Zertifizierungen</span>

						<div slot="details" class="[&_p]:leading-relaxed">
							<div class="grid gap-4 lg:grid-cols-2">
								<div class="flex flex-col items-start gap-2">
									<h3 class="text-lg">UV Schutz – UV-Standard 801</h3>
									<p>
										berücksichtigt nicht nur den UV-Schutz im Neuzustand des Textils, sondern auch
										den Einfluss von Dehnung, Nässe, Abrieb und anderen Einflüssen Fokus auf wie gut
										ein Textilmaterial die Haut vor den schädlichen Auswirkungen der UV-Strahlung
										schützen kann, wenn es im täglichen Gebrauch ist
									</p>
									<div class="flex-1">
										<enhanced:img
											src={CertUvStandard}
											alt="UV-Standard 801"
											class=" h-full max-h-44 w-full object-contain"
										/>
									</div>
								</div>
								<div class="flex flex-col items-start gap-2">
									<div>
										<h3 class="text-lg">FSC Recycled</h3>
										<p>
											berücksichtigt nicht nur den UV-Schutz im Neuzustand des Textils, sondern auch
											den Einfluss von Dehnung, Nässe, Abrieb und anderen Einflüssen Fokus auf wie
											gut ein Textilmaterial die Haut vor den schädlichen Auswirkungen der
											UV-Strahlung schützen kann, wenn es im täglichen Gebrauch ist
										</p>
									</div>
									<div class="flex-1">
										<enhanced:img
											src={CertRecycled}
											alt="FSC Recycled"
											class="h-full max-h-44 w-full object-contain"
										/>
									</div>
								</div>
							</div>
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
