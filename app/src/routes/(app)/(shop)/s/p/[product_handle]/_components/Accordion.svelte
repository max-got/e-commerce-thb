<script>
	export let open = false;
	import { slide } from 'svelte/transition';
	const handleClick = () => (open = !open);

	import Arrow from '~icons/ph/caret-up-bold';
</script>

<div
	class="hover:border-accent hover:after:border-accent relative z-0 my-1 border-b border-t px-2 py-2 hover:after:absolute hover:after:-inset-px hover:after:-z-10 hover:after:block hover:after:border {open &&
		'border-primary'}"
>
	<div class="flex w-full">
		<button class="text-left" on:click={handleClick}>
			<h4 class="flex flex-1 items-center gap-2 text-lg font-medium">
				<slot name="head" />
				<div class="bg-primary grid place-content-center rounded-full p-px">
					<Arrow class=" block h-4 w-4  text-white transition-transform {open && 'rotate-180'}" />
				</div>
			</h4>
		</button>
	</div>

	{#if open}
		<div class="max-w-prose py-2" transition:slide>
			<slot name="details" />
		</div>
	{/if}
</div>
