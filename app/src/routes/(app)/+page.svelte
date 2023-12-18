<script lang="ts">
	import { page } from '$app/stores';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import Faq from '$lib/components/FAQ.svelte';
	import { CtaOne } from '$lib/components/ctas';

	import FeaturedProducts from '$lib/components/products/FeaturedProducts.svelte';
	import { toast } from 'svelte-sonner';

	import type { PageServerData } from './$types';
	import Hero from './Hero.svelte';

	export let data: PageServerData;

	$: if ($page.url.searchParams.get('login') === 'success') {
		toast.success(`Erfolgreich eingeloggt, ${$page.data.locals?.student?.name ?? ''}`, {
			description: 'Herzlich Willkommen in unserem Shop!',
			descriptionClass: '!text-xs',
			invert: true,
			position: 'top-right'
		});

		//delete the query param
		const url = new URL(location.href);
		url.searchParams.delete('login');
		history.replaceState(null, '', url.toString());
	}
</script>

<Hero />
<FeaturedProducts featured_products={data.shop.featured_products} />
<CtaOne />
<Faq id="faq" />

<BentoGrid />
