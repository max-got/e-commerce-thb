<script lang="ts">
	import * as CartComponent from '$lib/components/cart';
	import type { Cart } from '@medusajs/medusa';
	export let cart: Cart;
</script>

<CartComponent.Root class="p-0" items={cart.items} style="checkout" let:item>
	<CartComponent.Item {item} />
	<svelte:fragment slot="rest">
		<CartComponent.Price {cart} style="checkout" />
	</svelte:fragment>
</CartComponent.Root>
