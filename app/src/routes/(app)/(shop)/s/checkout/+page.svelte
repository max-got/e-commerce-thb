<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { sidebar_cart_open } from '$lib/components/cart';
	import * as Cart from '$lib/components/cart';
	import './style.postcss';

	import CheckoutForm from './components/CheckoutForm.svelte';

	import ShippingOptions from './ShippingOptions.svelte';

	import LoadingSpinner from '$lib/components/primitives/LoadingSpinner.svelte';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';
	import { enhance } from '$app/forms';
	import Discount from './Discount.svelte';
	import Informations from '$lib/components/customer/Informations.svelte';

	import FakePaymentButtons from './components/FakePaymentButtons.svelte';

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

<!--Cart is empty-->
{#if (!data.cart || data.cart?.items.length === 0) && !form?.order}
	<section class="px-4 py-12">
		<div class="flex flex-col items-center justify-center gap-4">
			<h2 class="text-lg">Dein Warenkorb ist leer</h2>
			<Button href="/" colorway="primary">Zurück zum Shop</Button>
		</div>
	</section>
{/if}

{#if data.cart && data.cart?.items.length !== 0}
	<section class="relative flex flex-col gap-12 bg-white px-4 py-4 md:flex-row">
		<div class="relative flex w-full flex-1 flex-col gap-6 md:w-2/3">
			<div class="flex flex-col gap-4">
				<h2>Bestellinformationen</h2>
				{#if !data.cart?.shipping_address}
					<CheckoutForm data={data.forms.checkout_form} />
				{/if}

				{#if data.cart?.shipping_address}
					<Informations customer={data.cart.shipping_address} email={data.cart.email} />

					<h2 class="text-lg">Versand</h2>
					<ShippingOptions
						selected_shipping_option={data.cart?.shipping_methods?.[0]?.shipping_option_id}
						shipping_options={data.shipping_options}
						data={data.forms.shipping_options_form}
					/>
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
			<FakePaymentButtons />
			<div class="ml-auto flex max-w-lg pt-4 text-end">
				<form action="?/complete" method="POST" use:enhance>
					<Button
						type="submit"
						class="ml-auto"
						disabled={!cart_ready_to_checkout || $loading}
						colorway="primary"
						aria-disabled={!cart_ready_to_checkout || $loading}
						aria-busy={$loading}
					>
						Zahlungspflichtig bestellen</Button
					>
					<p class="font-display pt-1 text-sm">
						Mit Ihrer Bestellung erklären Sie sich mit unseren Allgemeinen Geschäftsbedingungen
						einverstanden. Bitte lesen Sie unsere Datenschutzerklärung, unsere Hinweise zu Cookies
						und unsere Hinweise zu interessenbasierter Werbung
					</p>
				</form>
			</div>
		</section>
	{/if}
{/if}

<!--Order is done-->
{#if form?.order}
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
{/if}
