<script lang="ts">
	import { page } from '$app/stores';
	import type { Cart as CartType } from '@medusajs/medusa';
	import * as Cart from '$lib/components/cart';

	let cart_items: CartType['items'] | [];
	$: cart_items = ($page.data?.cart?.items as CartType['items']) ?? [];
</script>

<Cart.Root items={cart_items} style="sidebar" let:item>
	<Cart.Item {item} />
	<svelte:fragment slot="rest">
		{#if $page.data.cart}
			<Cart.Price cart={$page.data.cart} />
		{/if}
		<Cart.Buttons />
	</svelte:fragment>
</Cart.Root>
