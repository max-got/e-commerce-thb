<script lang="ts">
	import cloud_1 from '$lib/assets/footer/cloud_1.png?enhanced';
	import cloud_2 from '$lib/assets/footer/cloud_2.png?enhanced';
	import Logo from '$lib/components/assets/Logo.svelte';

	import Envelope from '~icons/ph/envelope-fill';
	import Facebook from '~icons/ph/facebook-logo';
	import TikTok from '~icons/ph/tiktok-logo';
	import Instagram from '~icons/ph/instagram-logo';
	import LogOutLink from '../auth/LogOutLink.svelte';
	import { page } from '$app/stores';
</script>

<footer class="bg-accent">
	<div class="bg-accent max-w-layout relative z-0 mx-auto w-full overflow-hidden px-12 py-16 pb-4">
		<!-- TOP CONTAINER -->
		<div class="relative flex w-full flex-col lg:flex-row lg:justify-between">
			<!-- LEFT DIV -->
			<div class="flex flex-col lg:mr-20">
				<!-- LOGO -->
				<a href="/" class="inline-block max-w-full">
					<Logo class="text-primary group-hover:text-accent-100 h-fit w-24 transition-colors" />
				</a>
				<p class="text-accent-100 my-4 max-w-prose text-sm font-light">
					Mehr als nur Schirme, sondern Ausdruck deines einzigartigen Styles. Unsere Teile trotzen
					nicht nur dem Regen, sondern auch dem Gewöhnlichen. Urbaner Chic, made in Germany. Hier
					regiert Zenit - wo Streetwear auf Funktion trifft und dein Style keine Kompromisse kennt.
				</p>
				<!-- NEWSLETTER  -->
				<div class="flex flex-col py-4">
					<h3 class="text-secondary mb-2 text-lg tracking-normal">Newsletter</h3>
					<p class="text-secondary mb-4 w-full text-xs [text-wrap:wrap]">
						Erhalte Produktneuheiten und Updates in deinem Posteingang
					</p>
					<form action="#">
						<div class=" mb-3 max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
							<div class="relative w-full">
								<label
									for="email"
									class="mb-2 hidden text-sm font-medium text-gray-900 dark:text-gray-300"
									>Email address</label
								>
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Envelope class="text-white" />
								</div>
								<input
									class=" block w-full rounded-lg !rounded-r-none rounded-l-lg bg-[inherit] !py-3 pl-10 text-sm !text-white"
									placeholder="peter-lustig@email.de"
									type="email"
									id="email"
									required
									autocomplete="email"
								/>
							</div>
							<div>
								<button
									type="submit"
									class="bg-secondary hover:bg-secondary-600 text-accent w-full cursor-pointer rounded-l-none rounded-r-lg px-5 py-3.5 text-center text-sm font-medium"
									>Anmelden</button
								>
							</div>
						</div>

						<div class="flex items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								required
								class="h-4 w-4 rounded border-gray-300"
							/>
							<label for="terms" class="ml-2 block max-w-prose text-sm text-white no-underline">
								Ich bestätige, dass ich die <a
									href="/terms-and-conditions"
									class="text-secondary hover:text-secondary-600">Geschäftsbedingungen</a
								>
								von Zenit gelesen und verstanden habe und stimme der Verarbeitung meiner persönlichen
								Daten für Marketing- und Profilingzwecke zu.
							</label>
						</div>
					</form>
				</div>
			</div>
			<!-- RIGHT DIV -->
			<div class="mt-7 max-w-[700px] grow justify-end lg:flex lg:flex-row">
				<!-- FOOTER LINKS -->
				<div class="flex w-full flex-row flex-wrap lg:flex-nowrap lg:items-start lg:justify-end">
					<div class="my-5 mr-8 flex flex-1 flex-col space-y-5 lg:ml-10">
						<h2 class="text-accent-200 text-base uppercase">Support</h2>
						<a href="/terms-and-conditions" class="font-body text-sm font-light text-white">AGBs</a>
						<a href="/imprint" class="font-body text-sm font-light text-white">Impressum</a>
						<a href="/privacy-policy" class="font-body text-sm font-light text-white"
							>Datenschutzerklärung</a
						>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-14 mt-16 w-full [border-bottom:1px_solid_rgb(100,_112,_132)]"></div>
		<!-- BOTTOM CONTAINER -->
		<div class="mt-20 flex flex-col items-center gap-6 lg:flex-row-reverse lg:justify-between">
			<!-- SOCIAL MEDIA ICONS -->
			<div class="flex flex-row items-center justify-center gap-8">
				<a href="/" class="text-secondary text-xl no-underline">
					<Facebook />
				</a>
				<a href="/" class="text-secondary text-xl no-underline">
					<Instagram />
				</a>
				<a href="/" class="text-secondary text-xl no-underline">
					<TikTok />
				</a>
				<a href="/" class="text-secondary text-xl no-underline">𝕏</a>
			</div>
			{#if $page.data.user}
				<LogOutLink colorway="ghost" class="lg:ml-auto" />
			{/if}
			<p class="font-inter text-sm text-gray-500 lg:mt-0">
				© Copyright 2023. All rights reserved.
			</p>
		</div>
		<div class="cloud1 absolute inset-0 will-change-transform">
			<enhanced:img
				src={cloud_1}
				alt="An alt text"
				class="h-full w-full object-contain"
				loading="lazy"
			/>
		</div>
		<div class="cloud2 absolute inset-0 will-change-transform">
			<enhanced:img
				src={cloud_2}
				alt="An alt text"
				class="h-full w-full object-contain"
				loading="lazy"
			/>
		</div>
	</div>
</footer>

<style>
	.cloud1 {
		animation: animateCloud 60s linear infinite;
		animation-delay: 0s;
		mix-blend-mode: exclusion;
		z-index: -10;
		pointer-events: none;
		user-select: none;
	}

	.cloud2 {
		animation: animateCloud 70s linear infinite;
		animation-delay: 5s;
		filter: blur(1px);
		mix-blend-mode: luminosity;
		z-index: -10;
		pointer-events: none;
		user-select: none;
	}

	@keyframes animateCloud {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
