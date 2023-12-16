<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/primitives/Button.svelte';
	import ArrowRight from '~icons/ph/arrow-right';
</script>

<div class="ml-auto inline-flex w-full flex-1 flex-wrap justify-around gap-4">
	{#if $page.url.pathname !== '/s/cart'}
		<Button colorway="simple" size="small" href="/s/cart">Zum Warenkorb</Button>
	{/if}

	{#if $page.url.pathname !== '/s/checkout'}
		<Button colorway="primary" size="small" href="/s/checkout" icon={ArrowRight} icon_position="right"
			>Zur Kasse</Button
		>
	{/if}
</div>
