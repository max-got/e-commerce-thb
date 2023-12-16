<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="noise bg-gray-50">
	<div
		class="max-w-layout border-secondary mx-4 my-4 rounded-md border bg-white px-6 py-6 shadow-[5px_5px_0px_0px_theme(colors.secondary.DEFAULT)]"
	>
		<slot />
	</div>
</div>
