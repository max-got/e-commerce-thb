<script lang="ts">
	import '../app.postcss';
	import '@fontsource-variable/inter';
	import '@fontsource/ibm-plex-mono';
	import Header from '$lib/components/layout/Header.svelte';
	import TopHeader from '$lib/components/layout/TopHeader.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Sidebar />
<div class="mx-auto flex h-full flex-col">
	<TopHeader />
	<Header user={data.user} cart={data.cart} />
	<slot />
	<Footer />
</div>

<Toaster richColors />
