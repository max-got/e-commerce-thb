<script lang="ts">
	import Button from '$lib/components/primitives/Button.svelte';
	import type { Cart } from '@medusajs/medusa';
	import type { CartState } from './types';

	export let cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined = undefined;
	export let is_logged_in: boolean = false;

	let states: CartState = {
		cart_state: 'empty',
		user_state: 'not_logged_in',
		user_address_state: 'empty'
	} satisfies CartState;

	$: if (cart) {
		if (cart.items.length !== 0) {
			states.cart_state = 'not_empty';
		}

		if (is_logged_in) {
			states.user_state = 'logged_in';
		}

		if (cart.shipping_address) {
			states.user_address_state = 'not_empty';
		}
	}

	//Else it is undefined in the template
	const type_cast_to_cart = (value: Cart | unknown) => value as Cart;
</script>

<div class="max-w-layout mx-auto px-4">
	<header class="flex flex-col items-center justify-center py-4">
		<slot name="header" />
	</header>

	{#if !cart}
		<section class="px-4 py-12">
			<div class="flex flex-col items-center justify-center gap-4">
				<h2 class="text-lg">Dein Warenkorb ist leer</h2>
				<Button href="/" colorway="primary">Zurück zum Shop</Button>
			</div>
		</section>
	{:else}
		<slot {states} cart={type_cast_to_cart(cart)} />
	{/if}
</div>
