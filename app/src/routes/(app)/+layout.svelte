<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import TopHeader from '$lib/components/layout/TopHeader.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutData } from './$types';
	import { set_cart_count } from '$lib/stores/cart_count';

	export let data: LayoutData;

	set_cart_count(data.cart?.items.map((i) => i.quantity).reduce((a, b) => a + b, 0) ?? 0);
</script>

<Sidebar />
<div class="mx-auto flex h-full flex-col">
	<TopHeader />
	<Header user={data.user ?? undefined} cart={data.cart} />
	<slot />
	<Footer />
</div>

<Toaster richColors position="bottom-right" />
