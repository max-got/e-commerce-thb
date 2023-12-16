<script context="module" lang="ts">
	export type StyleContext = Writable<'sidebar' | 'cart' | 'checkout'>;
</script>

<script lang="ts">
	import type { LineItem } from '@medusajs/medusa';
	import { sidebar_cart_open } from '.';

	import { writable, type Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { setContext, type ComponentProps } from 'svelte';

	import { page } from '$app/stores';

	import { cn } from '$lib/utils/cn';
	import Button from '$lib/components/primitives/Button.svelte';
	import { click_outside } from '$lib/actions/click_outside';
	import X from '~icons/ph/x-circle';

	export { classes as class };
	let classes = '';

	export let style: 'sidebar' | 'cart' | 'checkout' = 'cart';

	export let items: LineItem[] | [] = [];

	function esc_press(e: KeyboardEvent) {
		if (style !== 'sidebar') return;
		if (e.key === 'Escape') {
			$sidebar_cart_open = false;
		}
	}

	const colors: Record<typeof style, string> = {
		cart:
			'[--bg:theme(colors.accent.DEFAULT)] [--border:theme(colors.accent.400)] [--text:theme(colors.white)]',
		sidebar:
			'[--bg:theme(colors.accent.DEFAULT)] [--border:theme(colors.accent.400)] [--text:theme(colors.white)]',
		checkout:
			'[--bg:theme(colors.white)] [--border:none)] [--text:theme(colors.accent.DEFAULT)] [--text-p:theme(colors.accent.500)]'
	};

	const button_style: Record<typeof style, ComponentProps<Button>['colorway']> = {
		cart: 'accent',
		sidebar: 'accent',
		checkout: 'primary'
	};

	$: setContext('style', writable(style));
</script>

<svelte:window on:keydown={esc_press} />

{#if $sidebar_cart_open}
	<div class="fixed inset-0 z-40 bg-black bg-opacity-50" transition:fade></div>
{/if}
<aside
	class={cn(
		'relative h-full  w-full border-[--border] bg-[--bg]  px-4 py-6 text-[--text]  [&_p]:text-[--text-p]',
		style === 'sidebar' &&
			'max-w-max-w-[min(80vw,400px)] fixed right-[-100%]  z-50 rounded-l-3xl shadow-lg transition-all duration-300 ease-in-out supports-[max-width:100svw]:max-w-[min(80svw,400px)] ',
		style === 'sidebar' && $sidebar_cart_open && 'right-0',
		style === 'cart' && 'block',
		style === 'checkout' && 'bg-transparent',
		colors[style],
		classes
	)}
	use:click_outside={() => ($sidebar_cart_open = false)}
>
	{#if style === 'sidebar'}
		<button
			class="text-primary-400 absolute right-2 top-2"
			on:click={() => ($sidebar_cart_open = false)}
		>
			<span class="sr-only">Schließen</span>
			<X />
		</button>
	{/if}
	<header class="text-center">
		{#if style !== 'checkout'}
			<h2 class="text-primary-400 text-xl font-bold sm:text-3xl">Warenkorb</h2>
		{/if}
		<span class="bg-primary-300 my-2 block h-px w-full"></span>
	</header>

	{#if !items || items.length === 0}
		<div class="flex flex-col justify-center gap-4 self-center text-center">
			<p class="text-center">Keine Artikel im Warenkorb</p>
			<Button
				colorway={button_style[style]}
				size="small"
				href={$page.url.pathname !== '/' ? '/' : undefined}
				on:click={$page.url.pathname !== '/' ? undefined : () => ($sidebar_cart_open = false)}
				>Zum Shop</Button
			>
		</div>
	{:else}
		<div class="mx-auto space-y-5 py-6">
			<ul class="wrapper max-h-[800px] space-y-4 overflow-y-auto">
				{#each items as item (item.id)}
					<slot {item} {style} />
				{/each}
			</ul>

			<slot name="rest" {style} />
		</div>
	{/if}
</aside>

<style lang="postcss">
	.wrapper {
		--color: theme(colors.accent.400/30%);
		--accent: theme(colors.secondary.DEFAULT);
	}
	.wrapper::-webkit-scrollbar {
		width: 0.5rem;
		background-color: var(--color);
	}

	.wrapper::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
		border-radius: 3px;
		background-color: var(--color);
	}

	.wrapper::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: color-mix(in srgb, var(--color), var(--accent) 10%);
	}
</style>
