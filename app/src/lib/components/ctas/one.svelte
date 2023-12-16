<script lang="ts">
	import Aesthetic from '$lib/assets/image/aesthetic_umbrella.jpg?enhanced';
	import { onMount } from 'svelte';
	import Button from '../primitives/Button.svelte';
	import throttle from 'just-throttle';

	let card: HTMLDivElement;
	let container: HTMLDivElement;

	const CONFIG = {
		proximity: 40,
		spread: 80,
		blur: 20,
		gap: 32,
		vertical: false,
		opacity: 0
	};

	const UPDATE = (event: PointerEvent) => {
		// get the angle based on the center point of the card and pointer position

		// Check the card against the proximity and then start updating
		const card_bounds = card.getBoundingClientRect();
		// Get distance between pointer and outerbounds of card
		if (
			event?.x > card_bounds.left - CONFIG.proximity &&
			event?.x < card_bounds.left + card_bounds.width + CONFIG.proximity &&
			event?.y > card_bounds.top - CONFIG.proximity &&
			event?.y < card_bounds.top + card_bounds.height + CONFIG.proximity
		) {
			// If within proximity set the active opacity
			setTimeout(() => {
				card.style.setProperty('--active', '1');
			}, 200);
		} else {
			card.style.setProperty('--active', '0');
		}
		const card_CENTER = [
			card_bounds.left + card_bounds.width * 0.5,
			card_bounds.top + card_bounds.height * 0.5
		];

		let ANGLE = (Math.atan2(event?.y - card_CENTER[1], event?.x - card_CENTER[0]) * 180) / Math.PI;
		ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

		card.style.setProperty('--start', (ANGLE + 90).toString());
	};

	const throttled_update = throttle(UPDATE, 30, { leading: true });

	const RESTYLE = () => {
		container.style.setProperty('--gap', CONFIG.gap.toString());
		container.style.setProperty('--blur', CONFIG.blur.toString());
		container.style.setProperty('--spread', CONFIG.spread.toString());
	};

	onMount(() => {
		RESTYLE();
	});
</script>

<svelte:body on:pointermove={throttled_update} />

<section>
	<div class="max-w-layout bg-accent px-4 py-6" bind:this={container}>
		<div class="article bg-accent px-8 py-4" bind:this={card}>
			<div class="glows"></div>
			<div class="space-y-8">
				<enhanced:img
					src={Aesthetic}
					alt="girl with a cardboard box on the head"
					class="elevation-2 h-[300px] w-full rounded-2xl object-cover"
				/>
				<div class="space-y-2">
					<h2 class="text-white">Veniam nostrud consequat aliquip</h2>
					<p class="text-accent-200 max-w-prose">
						Fugiat tempor laborum qui laborum. Laborum qui laborum cupidatat aliqua ad enim. Laborum
						cupidatat aliqua ad enim occaecat.
					</p>
				</div>
			</div>

			<Button colorway="secondary" class="mt-4 w-fit" href="/">Unsere Story</Button>
		</div>
	</div>
</section>

<style lang="postcss">
	:global(:root) {
		--border: hsl(280 10% 50% / 1);
		--color: hsl(240 18% 80%);
		--border-width: 2px;
		--border-radius: 12px;
		--gradient: conic-gradient(
			from 180deg at 50% 70%,
			theme(colors.primary.DEFAULT) 0deg,
			theme(colors.secondary.DEFAULT) 72.0000010728836deg,
			theme(colors.primary.600) 144.0000021457672deg,
			theme(colors.secondary.600) 216.00000858306885deg,
			theme(colors.primary.DEFAULT) 288.0000042915344deg,
			theme(colors.white) 1turn
		);
	}

	.article {
		--active: 0.15;
		--start: 0;
		background: var(--card);

		border-radius: var(--border-radius);

		position: relative;
	}

	.glows {
		pointer-events: none;
		position: absolute;
		inset: 0;
		filter: blur(10px);
	}

	.glows::after,
	.glows::before {
		--alpha: 0;
		content: '';
		background: var(--gradient);
		background-attachment: fixed;
		position: absolute;
		inset: -5px;
		border: 10px solid transparent;
		border-radius: var(--border-radius);
		mask: linear-gradient(#0000, #0000),
			conic-gradient(
				from calc((var(--start) - (var(--spread) * 0.5)) * 1deg),
				#000 0deg,
				#fff,
				#0000 calc(var(--spread) * 1deg)
			);
		mask-composite: intersect;
		mask-clip: padding-box, border-box;
		opacity: var(--active);
		transition: opacity 1s;
	}

	.article::before {
		position: absolute;
		inset: 0;
		border: var(--border-width) solid transparent;
		content: '';
		border-radius: var(--border-radius);
		pointer-events: none;
		background-attachment: fixed;
		border-radius: var(--border-radius);
		mask: linear-gradient(#0000, #0000),
			conic-gradient(
				from calc(((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 1.5)) * 1deg),
				hsl(0 0% 100% / 0.15) 0deg,
				white,
				hsl(0 0% 100% / 0.15) calc(var(--spread) * 2.5deg)
			);
		mask-clip: padding-box, border-box;
		mask-composite: intersect;
		opacity: var(--active);
		transition: opacity 1s;
	}

	.article::after {
		--bg-size: 100%;
		content: '';
		pointer-events: none;
		position: absolute;
		background: var(--gradient);
		background-attachment: fixed;
		border-radius: var(--border-radius);
		opacity: var(--active, 0);
		transition: opacity 1s;
		--alpha: 0;
		inset: 0;
		border: var(--border-width) solid transparent;
		mask: linear-gradient(#0000, #0000),
			conic-gradient(
				from calc(((var(--start) + (var(--spread) * 0.25)) - (var(--spread) * 0.5)) * 1deg),
				#0000 0deg,
				#fff,
				#0000 calc(var(--spread) * 0.5deg)
			);
		filter: brightness(1.5);
		mask-clip: padding-box, border-box;
		mask-composite: intersect;
	}
</style>
