<script lang="ts">
	import type { PageData } from './$types';

	import * as Cart from '$lib/components/cart';
	import { sidebar_cart_open } from '$lib/components/cart';
	import { page } from '$app/stores';

	export let data: PageData;

	$: if ($sidebar_cart_open) {
		$sidebar_cart_open = false;
	}
</script>

<section class="bg-accent">
	<div class="mx-auto min-h-screen max-w-screen-md">
		<Cart.Root items={data.cart?.items} style="cart" let:item>
			<Cart.Item {item} />
			<svelte:fragment slot="rest">
				<Cart.Price cart={$page.data.cart} />
				<p class="!text-accent-200 text-center text-xs">
					Die Versandkosten werden im Checkout berechnet.
				</p>
				<Cart.Buttons />
			</svelte:fragment>
		</Cart.Root>
	</div>
</section>
