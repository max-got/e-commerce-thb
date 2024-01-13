<script lang="ts">
	import type { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
	export let results: PricedProduct[] = [];

	const MIN_COLS = 1;
	const MAX_COLS = 3;
	$: grid_cols = results.length === 0 ? MIN_COLS : Math.min(results.length, MAX_COLS);
</script>

<div
	class="grid gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-[--cols]"
	style="--cols:repeat({grid_cols}, minmax(0, 1fr))"
>
	{#each results as result}
		<slot {result} />
	{/each}
</div>
