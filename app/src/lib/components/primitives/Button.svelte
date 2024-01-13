<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { ComponentType } from 'svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let href: string | undefined = undefined;

	export { classes as class };
	let classes = '';

	export let size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

	export let colorway: 'accent' | 'white' | 'ghost' | 'primary' | 'secondary' | 'simple' = 'white';

	export let icon: ComponentType | undefined = undefined;

	export let icon_position: 'left' | 'right' = 'left';

	const base = [
		// Base
		/*tw*/ 'relative no-underline z-0 elevation-2 hover:elevation-1 isolate grid grid-flow-col-dense items-center gap-[.55em] rounded-md px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing[1.5])-1px)] font-medium  justify-center',
		// Size
		/*tw*/ `${
			size === 'xsmall'
				? 'text-[11px]'
				: size === 'small'
				  ? 'text-sm'
				  : size === 'medium'
				    ? 'text-base'
				    : size === 'large'
				      ? 'text-lg'
				      : 'text-xs'
		}`,
		//inner highlight + out shadow
		/*tw*/ 'after:shadow-[shadow:inset_0_1px_theme(colors.white/11%),theme(boxShadow.md)]',
		// Invisible border for high-contrast mode compatibility
		/*tw*/ 'border border-transparent',
		// Optical border, implemented as background layer to avoid corner artifacts
		/*tw*/ 'before:absolute before:-inset-px before:-z-[10] before:rounded-md before:bg-[--button-border]',
		// Button background, implemented as foreground layer to stack on top of pseudo-border layer
		/*tw*/ 'after:absolute after:inset-0 after:-z-[10] after:rounded-[calc(theme(borderRadius.md)-1px)] after:bg-[--button-bg]',
		// White overlay on hover
		/*tw*/ 'after:hover:bg-[color-mix(in_srgb,var(--button-bg),white_20%)]',
		// Transition
		/*tw*/ 'after:transition-colors after:duration-200 after:ease-in-out',
		// SVG
		/*tw*/ '[&_svg:not([class])]:w-[1.45em] [&_svg:not([class])]:h-[1.45em]',
		// Aria Busy styling
		/*tw*/ 'aria-busy:opacity-60 aria-busy:cursor-wait aria-busy:hover:text-[inherit]',
		// Disabled styling
		/*tw*/ 'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:text-[inherit] aria-disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:hover:text-[inherit]'
	];

	const colors: Record<typeof colorway, string> = {
		accent:
			/*tw*/ '[--button-bg:theme(colors.accent.DEFAULT)] [--button-border:theme(colors.accent.950/90%)]  text-accent-100 hover:text-primary-400',
		white:
			/*tw*/ '[--button-bg:theme(colors.white)] [--button-border:theme(colors.accent.700/90%)] text-accent hover:text-accent-400 ',
		ghost:
			/*tw*/ '[--button-bg:theme(colors.white/50%)] [--button-border:theme(colors.white/20%)] text-accent hover:text-accent-400 ',
		primary:
			/*tw*/ '[--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.700/90%)]  text-primary-50 hover:text-primary-800',
		secondary:
			/*tw*/ '[--button-bg:theme(colors.secondary.DEFAULT)] [--button-border:theme(colors.secondary.400/80%)]  text-secondary-950 hover:text-secondary-800',
		simple:
			/*tw*/ 'after:content-none  before:content-none [--button-bg:theme(colors.accent.950/90%)] [--button-border:theme(colors.accent.950/90%)]  text-accent-100 hover:text-accent-200'
	};
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	href={href ?? undefined}
	role={href ? undefined : 'button'}
	class={cn(colors[colorway], base.join(' '), classes)}
	on:click
	{...$$restProps}
>
	{#if icon && icon_position === 'left' && !$$restProps['aria-busy']}
		<svelte:component this={icon} />
	{/if}
	<slot />
	{#if $$restProps['aria-busy']}
		<LoadingSpinner class="col-start-2 col-end-3" />
	{/if}
	{#if icon && icon_position === 'right' && !$$restProps['aria-busy']}
		<svelte:component this={icon} />
	{/if}
</svelte:element>

<style>
	.wait_spinner {
		transform-origin: center;
		animation: spinner_svv2 0.75s infinite linear;
	}
	@keyframes spinner_svv2 {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
