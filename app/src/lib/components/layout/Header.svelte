<script lang="ts">
	import { page } from '$app/stores';

	import Logo from '$lib/components/assets/Logo.svelte';

	import Basket from '~icons/ph/shopping-cart';
	import { sidebar_cart_open } from '$lib/components/cart';
	import type { Cart, Customer } from '@medusajs/medusa';

	export let cart: Cart | undefined = undefined;
	export let user: Customer | undefined = undefined;

	$: is_homepage = $page.route.id === '/';

	let number_of_items: number | string | undefined;
	$: if (cart)
		number_of_items =
			cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0) > 9
				? '9+'
				: cart.items.map((item) => item.quantity).reduce((a, b) => a + b, 0);
</script>

<header class="bg-accent border-primary relative z-10 border-b shadow-md">
	<div class="loadingbar_indicator"></div>
	<div class="mx-auto max-w-screen-xl px-4 py-2">
		<div class="flex items-center justify-between">
			<div class="flex-1 md:flex md:items-center md:gap-12">
				<a class="block" href="/">
					<span class="sr-only">Home</span>
					<Logo class="group-hover:text-primary text-primary h-full w-16 transition-colors" />
				</a>
			</div>

			<div class="md:flex md:items-center md:gap-12">
				<nav aria-label="Global" class="hidden md:block">
					<ul class="flex items-center gap-6 text-sm">
						<li>
							<a class="text-primary font-body no-underline transition" href="/"> Lorem </a>
						</li>

						<li>
							<a class="text-primary font-body no-underline transition" href="/"> Ipsum </a>
						</li>

						<li>
							<a class="text-primary font-body no-underline transition" href="/"> Dolor </a>
						</li>

						<li>
							<a class="text-primary font-body no-underline transition" href="/"> Amet </a>
						</li>
					</ul>
				</nav>

				<div class="flex items-center gap-4">
					{#if user}
						<a href="/profile/edit" class="no-underline">
							<div class=" grid h-8 w-8 place-content-center rounded-full bg-white">
								{#if user.first_name && user.last_name}
									<p>
										{user.first_name[0] + user.last_name[0]}
									</p>
								{:else}
									<p></p>
								{/if}
							</div>
						</a>
					{/if}
					{#if $page.url.pathname !== '/s/cart' && $page.url.pathname !== '/s/checkout'}
						<button on:click={() => ($sidebar_cart_open = true)} class="text-white">
							<span class="sr-only">Warenkorb öffnen</span>
							<Basket class="text-xl text-white" />
							{#if cart}
								<span
									class="bg-primary font-body elevation-2 absolute right-[.8em] top-[.1em] flex h-[0.8em] w-[0.8em] items-center justify-center rounded-full p-[.65em] text-[0.75em] tabular-nums text-white"
								>
									{number_of_items}
								</span>
							{/if}
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>

{#if is_homepage}
	<div class="bg-accent text-primary block py-px">
		<div class="whitespace-no-wrap max-w-layout relative mx-auto flex items-center overflow-x-hidden">
			<div class="marquee whitespace-nowrap">
				<!--eslint-disable-next-line @typescript-eslint/no-unused-vars --->
				{#each { length: 18 } as _, i}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 239.8 95.2"
						class="mx-6 mb-1 inline-block h-auto w-8 hover:text-white"
					>
						<use href="#zenit_logo_defs" />
					</svg>
				{/each}
			</div>

			<div class="marquee2 absolute whitespace-nowrap">
				<!--eslint-disable-next-line @typescript-eslint/no-unused-vars --->
				{#each { length: 18 } as _, i}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 239.8 95.2"
						class="mx-6 mb-1 inline-block h-auto w-8 hover:text-white"
					>
						<use href="#zenit_logo_defs" />
					</svg>
				{/each}
			</div>
		</div>
	</div>
{/if}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.8 95.2" style="display:none;">
	<defs>
		<g id="zenit_logo_defs" fill="currentColor">
			<path
				d="M90 26c-18 0-27 10-32 32l-2 19H32l31-51 4-15H19l-4 18h22L3 82 0 95h80c21 0 25-13 28-22H85c-2 5-3 7-5 7-1 0-2-1-2-4l2-10h29l3-11c4-18-3-29-22-29Zm-1 27h-6c2-10 3-12 5-12s2 1 2 3l-1 9Z"
			/>
			<path
				d="m114 49 5-22h18c3 0 5 3 4 5 3-3 8-6 15-6 11 0 15 9 13 21l-11 47h-23l9-45c1-4 1-6-2-6-2 0-3 2-4 7l-9 44h-24l9-45Z"
			/>
			<path d="m198 27-4 2-2 1a11 11 0 0 1-11-1l-4-2h-1l-15 67h24l14-67h-1Z" />
			<path
				d="M202 27h7l3-14h23l-3 14h8l-4 18h-8l-6 28c0 4 1 5 4 5l3-1-3 17-13 1c-14 0-18-5-15-18l7-32h-7l4-18Z"
			/>
			<path d="m195 24-3 2a11 11 0 0 1-9 0l-3-2c-3-3-4-8-1-12l8-12 9 12c3 4 2 9-1 12Z" />
		</g>
	</defs>
</svg>

<style lang="postcss">
	.marquee {
		animation: marquee 45s linear infinite;
	}

	.marquee2 {
		animation: marquee2 45s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-100%);
		}
	}

	@keyframes marquee2 {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0%);
		}
	}
</style>
