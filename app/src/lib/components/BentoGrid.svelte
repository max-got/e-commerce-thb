<script lang="ts">
	import Logo from '$lib/components/assets/Logo.svelte';
	import CardboxGirl from '$lib/assets/image/girl_covered.jpg?enhanced';
	import FloatingUmbrella from '$lib/assets/image/umbrella_floating.jpg?enhanced';
	import Holographic from '$lib/assets/gradients/holographic.jpeg?enhanced';

	function spotlight(
		element: HTMLElement,
		{ color }: { color: `theme(colors.${string}.${string})` }
	) {
		//create a div that follows the cursor with restricted movement to the parent element
		const spotlight = document.createElement('div');
		spotlight.setAttribute('class', `[--c:${color}]`);
		spotlight.style.position = 'absolute';
		spotlight.style.top = '0';
		spotlight.style.left = '0';
		spotlight.style.width = '100%';
		spotlight.style.height = '100%';
		spotlight.style.pointerEvents = 'none';
		spotlight.style.borderRadius = '50%';
		spotlight.style.background = `radial-gradient(ellipse 40% 40% at 50% -20%, rgba(255, 255, 255, 0.5), color-mix(in srgb, var(--c), rgba(0,0,0,1) 40%) 70%)`;
		spotlight.style.transform = 'translate(-50%, -50%)';
		spotlight.style.transition = 'all 0.2s ease-out';
		spotlight.style.filter = 'blur(30px)';
		spotlight.style.zIndex = '1000';
		spotlight.style.mixBlendMode = 'screen';
		element.appendChild(spotlight);

		element.addEventListener('mouseenter', () => {
			spotlight.style.opacity = '1';
		});

		//add event listener mousemove to parent element to move the spotlight
		element.addEventListener('mousemove', (e) => {
			spotlight.style.top = `${e.offsetY}px`;
			spotlight.style.left = `${e.offsetX}px`;
		});

		return {
			destroy() {
				element.removeEventListener('mousemove', (e) => {
					spotlight.style.top = `${e.offsetY}px`;
					spotlight.style.left = `${e.offsetX}px`;
				});
				element.removeEventListener('mouseleave', () => {
					spotlight.style.opacity = '0';
				});
			}
		};
	}

	function observer_fade_in(element: HTMLElement) {
		const element_childs = element.children;

		for (let i = 0; i < element_childs.length; i++) {
			const el = (Array.from(element_childs) as HTMLElement[])[i];
			el.style.willChange = 'transform, opacity';
			el.style.transformOrigin = 'center center';
			el.style.opacity = '0';
			el.style.transition = 'all 0.5s ease-out';
			el.style.transform = 'translateY(50px) scale(0.9)';
			el.style.transitionDelay = `${i * 0.2}s`;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target as HTMLElement;
						el.style.opacity = '1';
						el.style.transform = 'translateY(0) scale(1)';

						observer.unobserve(el);

						//if animation is complete
						el.addEventListener('transitionend', () => {
							el.removeAttribute('style');
						});
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		for (const el of Array.from(element_childs) as HTMLElement[]) {
			observer.observe(el);
		}

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<section class="max-w-layout bg-white px-4 py-12">
	<div class="mx-auto max-w-4xl">
		<div class="grid auto-rows-[192px] grid-cols-2 gap-4 md:grid-cols-4" use:observer_fade_in>
			<div
				class=" card hover:elevation-0 elevation-2 col-span-2 flex items-center justify-center rounded-xl border-2 transition-all"
			>
				<div
					class="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,theme(colors.primary.300),theme(colors.primary.DEFAULT))]"
				>
					<p class="px-4 text-center text-sm text-white">
						Urbaner Chic, wetterfestes Design – Willkommen bei Zenit.
					</p>
				</div>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 relative col-span-2 block items-center justify-center rounded-xl border-2 transition-all lg:col-span-1"
			>
				<enhanced:img
					src={Holographic}
					alt="girl with a cardboard box on the head"
					class="h-full w-full object-cover mix-blend-luminosity"
				/>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 group col-span-1 flex items-center justify-center rounded-xl border-2 transition-all"
			>
				<div
					class="from-primary absolute inset-0 block bg-gradient-to-b opacity-0 transition-opacity group-hover:opacity-100"
				></div>
				<enhanced:img
					src={CardboxGirl}
					alt="girl with a cardboard box on the head"
					class="w-full mix-blend-exclusion"
				/>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 col-span-1 flex items-center justify-center rounded-xl border-2 transition-all"
			>
				<enhanced:img
					src={FloatingUmbrella}
					alt="girl with a cardboard box on the head"
					class="w-full"
				/>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 group relative col-span-2 flex items-center justify-center rounded-xl border-2 p-4 transition-all"
			>
				<Logo class="group-hover:text-primary w-40 transition-all group-hover:drop-shadow-md" />
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 col-span-1 flex items-center justify-center rounded-xl border-2 transition-all"
				use:spotlight={{ color: 'theme(colors.primary.DEFAULT)' }}
			>
				<div class="bg-secondary block h-full w-full"></div>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 group relative col-span-1 flex items-center justify-center rounded-xl border-2 transition-all lg:col-span-2"
			>
				<img
					src="/assets/hero.jpg"
					class="relative h-full w-full select-none rounded-lg object-cover object-top mix-blend-hard-light"
					alt=""
				/>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 group col-span-1 flex items-center justify-center rounded-xl border-2 p-4 transition-all"
			>
				<div class="flex h-full flex-col justify-between">
					<div class="flex items-center justify-center gap-4">
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
					</div>
					<div class="flex items-center justify-center gap-4">
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine group-hover:elevation-4 elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-[1.1]"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
					</div>
					<div class="flex items-center justify-center gap-4">
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
						<p
							class="animate-background-shine elevation-2 border-primary-300 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white transition-all [animation-duration:4s] group-hover:scale-95"
						>
							Fashion
						</p>
					</div>
				</div>
			</div>
			<div
				class=" card hover:elevation-0 elevation-2 relative col-span-1 flex items-center justify-center rounded-xl border-2 transition-all [--a:theme(colors.accent.DEFAULT);] [--c:theme(colors.accent.400);] hover:[--a:theme(colors.accent.400);] hover:[--c:theme(colors.accent.DEFAULT);]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 800 800"
					class="absolute inset-0 w-full"
					><defs
						><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hhhorizon-grad"
							><stop stop-color="var(--a)" stop-opacity="1" offset="25%"></stop><stop
								stop-color="var(--c)"
								stop-opacity="1"
								offset="100%"
							></stop></linearGradient
						><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hhhorizon-grad2"
							><stop stop-color="var(--c)" stop-opacity="1" offset="20%"></stop><stop
								stop-color="var(--a)"
								stop-opacity="1"
								offset="75%"
							></stop></linearGradient
						><clipPath id="SvgjsClipPath1005"
							><rect width="800" height="35" x="0" y="0"></rect><rect width="800" height="34" x="0" y="24"
							></rect><rect width="800" height="33" x="0" y="47"></rect><rect
								width="800"
								height="32"
								x="0"
								y="71"
							></rect><rect width="800" height="31" x="0" y="94"></rect><rect
								width="800"
								height="30"
								x="0"
								y="118"
							></rect><rect width="800" height="29" x="0" y="141"></rect><rect
								width="800"
								height="28"
								x="0"
								y="165"
							></rect><rect width="800" height="27" x="0" y="188"></rect><rect
								width="800"
								height="26"
								x="0"
								y="212"
							></rect><rect width="800" height="25" x="0" y="235"></rect><rect
								width="800"
								height="24"
								x="0"
								y="259"
							></rect><rect width="800" height="23" x="0" y="282"></rect><rect
								width="800"
								height="22"
								x="0"
								y="306"
							></rect><rect width="800" height="21" x="0" y="329"></rect><rect
								width="800"
								height="20"
								x="0"
								y="353"
							></rect><rect width="800" height="19" x="0" y="376"></rect><rect
								width="800"
								height="18"
								x="0"
								y="400"
							></rect><rect width="800" height="17" x="0" y="424"></rect><rect
								width="800"
								height="16"
								x="0"
								y="447"
							></rect><rect width="800" height="15" x="0" y="471"></rect><rect
								width="800"
								height="14"
								x="0"
								y="494"
							></rect><rect width="800" height="13" x="0" y="518"></rect><rect
								width="800"
								height="12"
								x="0"
								y="541"
							></rect><rect width="800" height="11" x="0" y="565"></rect><rect
								width="800"
								height="10"
								x="0"
								y="588"
							></rect><rect width="800" height="9" x="0" y="612"></rect><rect
								width="800"
								height="8"
								x="0"
								y="635"
							></rect><rect width="800" height="7" x="0" y="659"></rect><rect
								width="800"
								height="6"
								x="0"
								y="682"
							></rect><rect width="800" height="5" x="0" y="706"></rect><rect
								width="800"
								height="4"
								x="0"
								y="729"
							></rect><rect width="800" height="3" x="0" y="753"></rect><rect
								width="800"
								height="2"
								x="0"
								y="776"
							></rect><rect width="800" height="1" x="0" y="800"></rect></clipPath
						><clipPath
							><rect width="800" height="1" x="0" y="35"></rect><rect width="800" height="2" x="0" y="70"
							></rect><rect width="800" height="3" x="0" y="105"></rect><rect
								width="800"
								height="4"
								x="0"
								y="140"
							></rect><rect width="800" height="5" x="0" y="175"></rect><rect
								width="800"
								height="6"
								x="0"
								y="210"
							></rect><rect width="800" height="7" x="0" y="245"></rect><rect
								width="800"
								height="8"
								x="0"
								y="280"
							></rect><rect width="800" height="9" x="0" y="315"></rect><rect
								width="800"
								height="10"
								x="0"
								y="350"
							></rect><rect width="800" height="11" x="0" y="385"></rect><rect
								width="800"
								height="12"
								x="0"
								y="420"
							></rect><rect width="800" height="13" x="0" y="455"></rect><rect
								width="800"
								height="14"
								x="0"
								y="490"
							></rect><rect width="800" height="15" x="0" y="525"></rect><rect
								width="800"
								height="16"
								x="0"
								y="560"
							></rect><rect width="800" height="17" x="0" y="595"></rect><rect
								width="800"
								height="18"
								x="0"
								y="630"
							></rect><rect width="800" height="19" x="0" y="665"></rect><rect
								width="800"
								height="20"
								x="0"
								y="700"
							></rect><rect width="800" height="21" x="0" y="735"></rect><rect
								width="800"
								height="22"
								x="0"
								y="770"
							></rect><rect width="800" height="23" x="0" y="805"></rect></clipPath
						></defs
					><rect
						width="800"
						height="800"
						fill="url(#hhhorizon-grad)"
						clip-path="url(&quot;#SvgjsClipPath1005&quot;)"
					></rect></svg
				>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.card {
		--color: color-mix(in srgb, theme(colors.accent.DEFAULT), white 90%) !important;
		--shadow-color: color-mix(in srgb, theme(colors.accent.DEFAULT), white 70%) !important;
	}

	.card:nth-child(1) {
		--color: theme(colors.accent.300);
		--shadow-color: theme(colors.accent.500);
	}
	.card:nth-child(3) {
		--color: theme(colors.primary.DEFAULT);
		--shadow-color: theme(colors.primary.600);
	}
	.card:nth-child(4) {
		--color: theme(colors.secondary.300);
		--shadow-color: theme(colors.secondary.500);
	}
	.card:nth-child(5) {
		--color: theme(colors.primary.700);
		--shadow-color: theme(colors.primary.500);
	}
	.card:nth-child(6) {
		--color: color-mix(in srgb, theme(colors.secondary.DEFAULT), theme(colors.primary.DEFAULT) 80%);
	}
	.card:nth-child(7) {
		--color: theme(colors.accent.200);
	}

	.card {
		background-color: var(--color);
		border: 0px solid rgba(255, 255, 255, 0);
		border-radius: 24px;

		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		z-index: 0;
	}

	.card::after {
		content: '';
		border-radius: 24px;
		position: absolute;
		inset: 0.2px;
		border-top: 2px solid color-mix(in srgb, var(--color), var(--shadow-color) 25%);
		display: block;
		z-index: -10;
	}
	.card::before {
		content: '';
		border-radius: 24px;
		position: absolute;
		inset: 0;
		border: 1px solid color-mix(in srgb, white, var(--shadow-color) 80%);
		display: block;
		z-index: -2;
	}

	.a {
		--color: theme(colors.secondary.DEFAULT);
		background-color: var(--color);
	}
</style>
