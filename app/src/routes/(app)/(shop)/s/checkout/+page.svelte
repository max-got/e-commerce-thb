<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { sidebar_cart_open } from '$lib/components/cart';
	import { onMount } from 'svelte';

	import type { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';

	import * as CheckoutFlow from './_components/checkout-form';

	import LoadingSpinner from '$lib/components/primitives/LoadingSpinner.svelte';
	import { loading } from '$lib/stores/loading';
	import Button from '$lib/components/primitives/Button.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if ($sidebar_cart_open) {
		$sidebar_cart_open = false;
	}

	$: ready_to_checkout =
		(data.cart?.shipping_address &&
			data.cart?.payment_session &&
			data.cart.shipping_methods.length !== 0) ||
		false;

	let shipping_options: PricedShippingOption[] | [] = [];

	async function list_shipping_options(): Promise<PricedShippingOption[]> {
		try {
			$loading = true;
			const req = await fetch('checkout/shipping-options/list');
			const res = await req.json();
			$loading = false;
			return res;
		} catch (error) {
			$loading = false;
			console.log(error);
			return [];
		}
	}

	async function handle_list_shipping_options() {
		shipping_options = await list_shipping_options();
	}

	onMount(async () => {
		if (data.cart?.shipping_address) {
			await handle_list_shipping_options();
		}
	});
</script>

{#if data.cart && !form?.order}
	<div class="py-4">
		<CheckoutFlow.Root cart={data.cart} is_logged_in={data.is_logged_in} let:cart>
			<svelte:fragment slot="header">
				<h1 class="text-accent">Kasse</h1>
				{#if $loading}
					<LoadingSpinner class="text-primary absolute -right-9 col-start-1 row-start-1 m-auto" />
				{/if}
			</svelte:fragment>

			<div class="grid gap-4 md:grid-cols-2">
				<div
					class="[&_>div]:border-primary space-y-6 [&_>div]:border-b-[1px] [&_>div]:pb-4 last:[&_>div]:border-none last:[&_>div]:pb-0"
				>
					<div class="flex flex-col gap-2">
						<h2 class="text-accent mb-2 text-lg font-bold uppercase">Addresse</h2>

						<CheckoutFlow.AddressHandler
							{cart}
							form_data={data.forms.address_form}
							on:success={(e) => {
								if (e.detail) handle_list_shipping_options();
							}}
						/>
					</div>
					<div class="flex flex-col gap-2">
						<h2 class="text-accent mb-2 text-lg font-bold uppercase">Lieferung</h2>
						<CheckoutFlow.Shipping
							form_data={data.forms.shipping_options_form}
							{cart}
							{shipping_options}
							on:editing={handle_list_shipping_options}
						/>
					</div>
					<div class="flex flex-col gap-2">
						<h2 class="text-accent mb-2 text-lg font-bold uppercase">Zahlung</h2>
						{#if data.cart.payment_sessions.length === 0}
							<CheckoutFlow.PaymentOptions />
						{:else}
							<p>Kreditkarte</p>
							<p class="text-accent-200 text-sm">
								Das muss ich leider so lösen, da wir logischerweise keine echten Zahlungen
								durchführen.
							</p>
						{/if}
					</div>

					<div class=" hidden flex-col gap-2 md:flex">
						<CheckoutFlow.CompleteOrder ready={ready_to_checkout} />
					</div>
				</div>
				<div class="relative space-y-6">
					<div class="sticky top-4 flex flex-col gap-2">
						<h2 class="text-accent mb-2 text-lg font-bold uppercase">Warenkorb</h2>
						<CheckoutFlow.Items {cart} />
						<CheckoutFlow.Discount
							current_cart_discount={cart.discounts[0] || undefined}
							form_data={data.forms.discount_form}
						/>
					</div>

					<div class=" flex flex-col gap-2 md:hidden">
						<CheckoutFlow.CompleteOrder ready={ready_to_checkout} />
					</div>
				</div>
			</div>
		</CheckoutFlow.Root>
	</div>
{/if}

{#if !data.cart && form?.order}
	<section class="px-4 py-2">
		<div class="flex h-screen flex-col items-center justify-center gap-4 text-center">
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
