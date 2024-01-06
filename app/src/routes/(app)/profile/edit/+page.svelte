<script lang="ts">
	import EditInformations from '$lib/components/customer/EditInformations.svelte';
	import Informations from '$lib/components/customer/Informations.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import type { PageData } from './$types';

	import Package from '~icons/ph/package';
	import Clock from '~icons/ph/clock';

	export let data: PageData;

	const format_date_to_german = (
		date: Date,
		options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
	) => {
		if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
			return date.toLocaleDateString('de-DE', options);
		}

		return new Intl.DateTimeFormat('de-DE', options).format(date);
	};

	let user_is_editing = false;
</script>

<div
	class=" border-secondary mx-auto mb-4 flex flex-col items-start justify-between border-b pb-2 md:flex-row md:items-center"
>
	<div>
		<h4 class="text-2xl font-bold leading-tight text-gray-800">Dein Profil</h4>
		<ul
			aria-label="current Status"
			class="mt-3 flex flex-col items-start text-sm text-gray-600 dark:text-gray-400 md:flex-row md:items-center"
		>
			<li class="mr-4 mt-4 flex items-center md:mt-0">
				<div class="mr-1">
					<Package />
				</div>
				<span
					>{data.orders.length > 0
						? `${data.orders.length} Bestellung/en`
						: 'Noch keine Bestellungen'}</span
				>
			</li>
			<li class="mt-4 flex items-center md:mt-0">
				<div class="mr-1">
					<Clock />
				</div>
				<span>Dabei seit: {format_date_to_german(new Date(data.user.created_at))}</span>
			</li>
		</ul>
	</div>
	<div class="mt-6 md:mt-0">
		<Button
			size="xsmall"
			colorway={user_is_editing ? 'primary' : 'accent'}
			class="mb-4 ml-auto"
			on:click={() => (user_is_editing = !user_is_editing)}
		>
			{user_is_editing ? 'Abbrechen' : 'Lieferaddresse bearbeiten'}
		</Button>
	</div>
</div>

<section class="max-w-layout mx-auto px-4">
	{#if !user_is_editing}
		<Informations
			email={data.user.email}
			customer={data.user.shipping_addresses[0]}
			on:edit={() => (user_is_editing = true)}
		/>
	{:else}
		<EditInformations
			form={data.forms.edit_profile}
			on:edit_done={() => (user_is_editing = false)}
		/>
	{/if}
</section>
