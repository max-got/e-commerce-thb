<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main
	class="prose prose-h1:text-xl prose-h2:text-lg prose-headings:font-bold prose-sm mx-auto max-w-prose px-4 py-12"
>
	<slot />
</main>
