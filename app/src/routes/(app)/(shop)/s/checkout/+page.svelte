<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { sidebar_cart_open } from '$lib/components/cart';
	import * as Cart from '$lib/components/cart';
	import './style.postcss';

	import GuestCheckout from './GuestCheckout.svelte';

	import ShippingOptions from './ShippingOptions.svelte';

	import CustomerInformations from './CustomerInformations.svelte';
	import LoadingSpinner from '$lib/components/primitives/LoadingSpinner.svelte';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';
	import { enhance } from '$app/forms';
	import Discount from './Discount.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if ($sidebar_cart_open) {
		$sidebar_cart_open = false;
	}

	$: cart_ready_to_checkout =
		data.cart?.shipping_address &&
		data.cart?.payment_session &&
		data.cart.shipping_methods.length !== 0;
</script>

<header>
	<div class="max-w-layout pt-6 text-center">
		<div class="relative m-auto grid w-fit items-center justify-center gap-2">
			<h1 class="col-start-1 row-start-1">Kasse</h1>
			{#if $loading}
				<LoadingSpinner class="text-primary absolute  -right-9 col-start-1 row-start-1 m-auto" />
			{/if}
		</div>
		{#if data.cart && data.cart.items.length !== 0}
			<div class="mx-auto max-w-md">
				<Discount data={data.forms.discount_form} />
			</div>
		{/if}
	</div>
</header>

{#if (!data.cart || data?.cart?.items.length === 0) && !form?.order}
	<section class="px-4 py-12">
		<div class="flex flex-col items-center justify-center gap-4">
			<h2 class="text-lg">Dein Warenkorb ist leer</h2>
			<Button href="/" colorway="primary">Zurück zum Shop</Button>
		</div>
	</section>
{:else if form?.order}
	<section class="px-4 py-2">
		<div class="flex flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-lg">Vielen Dank für deine Bestellung</h2>
			<p>
				Deine Bestellung wurde erfolgreich abgeschlossen. Du erhältst in Kürze eine Bestätigung per
				E-Mail.
			</p>
			<p>
				Deine Bestellnummer lautet "<strong>{form.order.display_id}</strong>"
			</p>
			<Button href="/" colorway="primary">Zurück zum Shop</Button>
		</div>
	</section>
{:else}
	<section class="relative flex flex-col gap-12 bg-white px-4 py-4 md:flex-row">
		<div class="relative flex w-full flex-1 flex-col gap-6 md:w-2/3">
			<div class="flex flex-col gap-4">
				<h2>Bestellinformationen</h2>
				{#if !data.user && !data.cart?.shipping_address}
					<GuestCheckout data={data.forms.guest_checkout_form} />
				{:else if !data.user && data.cart?.shipping_address && data.cart}
					<CustomerInformations
						shipping_address={data.cart.shipping_address}
						email={data.cart.email}
						on:edit={() =>
							// @ts-expect-error - just a hack to show the form
							(data.cart.shipping_address = null)}
					/>

					{#if data.shipping_options.length !== 0}
						<h2 class="text-lg">Versand</h2>
						<ShippingOptions
							selected_shipping_option={data.cart?.shipping_methods?.[0]?.shipping_option_id}
							shipping_options={data.shipping_options}
							data={data.forms.shipping_options_form}
						/>
					{/if}
				{/if}
			</div>
		</div>
		<div class="sticky top-4 block h-fit w-full md:w-1/3">
			<h2 class="-mb-6 pl-4 text-lg">Warenkorb</h2>
			<Cart.Root items={data.cart?.items ?? []} style="checkout" let:item>
				<Cart.Item {item} />
				<svelte:fragment slot="rest">
					<Cart.Price cart={data.cart} style="checkout" />
				</svelte:fragment>
			</Cart.Root>
		</div>
	</section>

	{#if cart_ready_to_checkout}
		<section class="px-4 py-12">
			<div class="flex max-w-lg items-end">
				{#if data.cart?.shipping_address && data.shipping_options.length !== 0}
					<form action="?/complete" method="POST" use:enhance>
						<Button
							type="submit"
							disabled={!cart_ready_to_checkout}
							colorway="primary"
							aria-disabled={!cart_ready_to_checkout || !$loading}
							aria-busy={$loading}
						>
							Zahlungspflichtig bestellen</Button
						>
						<p class="font-display text-base">
							Mit Ihrer Bestellung erklären Sie sich mit unseren Allgemeinen Geschäftsbedingungen
							einverstanden. Bitte lesen Sie unsere Datenschutzerklärung, unsere Hinweise zu Cookies und
							unsere Hinweise zu interessenbasierter Werbung
						</p>
					</form>
				{/if}
			</div>
		</section>
	{/if}
{/if}
