<div
	class="justify-center rounded-b-3xl bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,theme(colors.primary.300),theme(colors.primary.DEFAULT))] pt-12 text-white md:px-0 lg:pt-16"
>
	<div class="mx-auto flex w-full flex-col items-center justify-center overflow-hidden px-6">
		<div class="flex max-w-2xl flex-col items-center md:px-8">
			<div
				class="mb-10 flex max-w-xl flex-col items-center sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl"
			>
				<div>
					<p
						class="animate-background-shine elevation-2 border-primary-300 mb-7 inline-block rounded-full border bg-[linear-gradient(110deg,theme(colors.primary.DEFAULT),45%,theme(colors.primary.300),55%,theme(colors.primary.DEFAULT))] bg-[length:200%_100%] px-3 py-px text-xs font-semibold uppercase tracking-wider text-white [animation-duration:4s]"
					>
						Hier regiert Zenit
					</p>
				</div>
				<h2
					class="leading-tighter mb-6 flex max-w-lg flex-col text-center font-sans text-5xl font-bold tracking-tight text-white drop-shadow-xl"
				>
					<span class="text-primary-100 font-body mb-2 text-[0.42em] leading-none"
						>Accessoires neu definiert:</span
					>
					Für deinen urbanen Vibe.
				</h2>
				<p
					class="relative z-10 text-center text-[color-mix(in_srgb,theme(colors.primary.DEFAULT),theme(colors.secondary.200)_95%)]"
				>
					Tauche ein in die Streetwear-Revolution! Wo Regenschirme nicht nur vor Nässe schützen,
					sondern auch deinen urbanen Vibe definieren. Unsere Designs vereinen Funktionalität mit
					stylischer Authentizität, weil dein Look nicht nur die Straßen, sondern auch den Himmel
					dominieren sollte.
				</p>
			</div>
			<div class="mb-4 flex w-full flex-col items-center md:flex-row"></div>
		</div>
		<div class="relative h-[350px] max-h-[700px] w-screen max-w-[75%]">
			<div class="ttt absolute inset-0 z-0 block"></div>

			<img
				src="/assets/hero.jpg"
				class="pointer-events-none relative z-10 mx-auto w-full select-none rounded-lg object-cover object-top mix-blend-difference"
				alt=""
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	.ttt {
		--s: theme(colors.accent.300);
		--b: theme(colors.secondary.200);
		--x: theme(colors.secondary.200);
		background: conic-gradient(
			from 230.29deg at 51.63% 52.16%,
			var(--x) 0deg,
			var(--b) 67.5deg,
			var(--x) 198.75deg,
			var(--s) 251.25deg,
			var(--x) 301.88deg,
			var(--s) 360deg
		);
		filter: blur(160px);
		transform: translateZ(0px);
	}

	@keyframes typing {
		from,
		to {
			width: 0;
		}
		50% {
			border-right: 2px solid transparent;
		}
	}
</style>
