<script lang="ts">
	import type { PageData } from './$types';

	import { writable } from 'svelte/store';

	import * as Cart from '$lib/components/cart';
	import { sidebar_cart_open } from '$lib/components/cart';
	import { page } from '$app/stores';

	export let data: PageData;

	$: cart_items = data.cart.items;

	$: if ($sidebar_cart_open) {
		$sidebar_cart_open = false;
	}
</script>

<section class="min-h-screen">
	<Cart.Root items={cart_items} style="cart" let:item>
		<Cart.Item {item} />
		<svelte:fragment slot="rest">
			<Cart.Price cart={$page.data.cart} />
			<p class="!text-accent-200 text-center text-xs">
				Die Versandkosten werden im Checkout berechnet.
			</p>
			<Cart.Buttons />
		</svelte:fragment>
	</Cart.Root>
</section>
