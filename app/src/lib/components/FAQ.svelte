<script lang="ts">
	const q_and_a = [
		{
			question: 'Wie unterscheiden sich Zenit-Schirme von herkömmlichen Modellen?',
			answer:
				'<p>Zenit-Regenschirme sind nicht nur funktionell, sondern setzen auch ein modisches Statement. Mit urbanem Chic und hochwertigem Design heben sie sich von gewöhnlichen Modellen ab.</p>'
		},
		{
			question: 'Sind Zenit-Schirme wirklich wetterfest?',
			answer:
				'<p>Absolut! Unsere Regenschirme werden in Deutschland hergestellt und bieten nicht nur einen stylischen Look, sondern sind auch robust und zuverlässig, um dich bei jedem Wetter trocken zu halten.</p>'
		},
		{
			question: 'Gibt es personalisierbare Optionen für die Premium-Modelle?',
			answer:
				'<p>Ja, unsere Premium-Modelle, wie der Zenit Style, bieten personalisierbare Optionen. Du kannst deinen Regenschirm an deinen individuellen Streetwear-Style anpassen.</p>'
		},
		{
			question: 'Warum sollte ich mich für einen Zenit-Schirm entscheiden?',
			answer:
				'<p>Zenit vereint Funktionalität und Fashion. Unsere Regenschirme sind nicht nur Schutz vor Regen, sondern auch Ausdruck deines einzigartigen Styles. </p>'
		},
		{
			question: 'Wo werden die Zenit-Schirme hergestellt?',
			answer:
				'<p>Alle Zenit-Regenschirme werden mit Liebe in Deutschland hergestellt. Qualität und Design stehen dabei im Fokus, um sicherzustellen, dass du nicht nur trocken bleibst, sondern auch mit Stil.</p>'
		},
		{
			question: 'Sind Zenit-Schirme umweltfreundlich?',
			answer:
				'<p>Absolut. Bei Zenit legen wir Wert auf Nachhaltigkeit. Unsere Regenschirme werden mit umweltfreundlichen Materialien hergestellt, und wir setzen uns für eine ressourcenschonende Produktion ein.</p>'
		}
	] as const;

	const first_half = q_and_a.slice(0, Math.ceil(q_and_a.length / 2));
	const second_half = q_and_a.slice(Math.ceil(q_and_a.length / 2));
</script>

<div class="max-w-layout z-0 mx-auto px-4 py-16" {...$$restProps}>
	<div class="mb-10 md:mb-12">
		<h2
			class="mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl"
		>
			Du hast Fragen? <br />
			Wir haben die Antworten!
		</h2>
		<p class="max-w-prose text-base text-gray-700 md:text-lg">
			Bei uns sollen keine Fragen offen bleiben. Deshalb haben wir hier die häufigsten Fragen und
			Antworten für dich zusammengestellt.
		</p>
	</div>

	<div class="max-w-screen-lg">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="grid space-y-8 [grid-template-rows:repeat(auto-fit,_minmax(150px,_1fr))]">
				{#each first_half as item}
					<div class="[&_p]:text-accent-400">
						<h2 class="mb-4 text-xl tracking-normal">{item.question}</h2>
						<!-- eslint-disable-next-line svelte/no-at-html-tags-->
						{@html item.answer}
					</div>
				{/each}
			</div>
			<div class="grid space-y-8 [grid-template-rows:repeat(auto-fit,_minmax(150px,_1fr))]">
				{#each second_half as item}
					<div class="[&_p]:text-accent-400">
						<h2 class="mb-4 text-xl tracking-normal">{item.question}</h2>
						<!-- eslint-disable-next-line svelte/no-at-html-tags-->
						{@html item.answer}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
