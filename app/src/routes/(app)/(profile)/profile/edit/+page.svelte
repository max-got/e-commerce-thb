<script lang="ts">
	import EditInformations from '$lib/components/customer/EditInformations.svelte';
	import Informations from '$lib/components/customer/Informations.svelte';
	import Button from '$lib/components/primitives/Button.svelte';
	import type { PageData } from './$types';

	import Package from '~icons/ph/package';
	import Clock from '~icons/ph/clock';
	import { format_price } from '$lib/utils/shop';

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
	$: user_has_shipping_address = data.user.shipping_addresses.length !== 0;
</script>

<div
	class=" border-secondary mx-auto mb-4 flex flex-col items-start justify-between border-b pb-2 md:flex-row md:items-center"
>
	<div>
		<h4 class="text-2xl font-bold leading-tight text-gray-800">Dein Profil</h4>
		<ul
			aria-label="current Status"
			class="mt-3 flex flex-col items-start text-sm text-gray-600 md:flex-row md:items-center"
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
</div>

<div class="space-y-6">
	<section class="max-w-layout mx-auto space-y-4">
		{#if user_is_editing || (!user_is_editing && !user_has_shipping_address)}
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-bold leading-tight text-gray-800">
						Lieferaddresse {user_has_shipping_address ? 'bearbeiten' : 'hinzufügen'}
					</h2>
					<Button
						size="xsmall"
						colorway="primary"
						on:click={() => (user_is_editing = !user_is_editing)}
					>
						{user_is_editing ? 'Abbrechen' : 'Bearbeiten'}
					</Button>
				</div>
				<div>
					<EditInformations
						form={data.forms.edit_profile}
						on:edit_done={() => (user_is_editing = false)}
					/>
				</div>
			</div>
		{:else if !user_is_editing && user_has_shipping_address}
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h2 class="text-2xl font-bold leading-tight text-gray-800">Lieferaddresse</h2>
					<Button
						size="xsmall"
						colorway="accent"
						on:click={() => (user_is_editing = !user_is_editing)}
					>
						Bearbeiten
					</Button>
				</div>
				<div>
					<Informations
						email={data.user.email}
						customer={data.user.shipping_addresses[0]}
						on:edit={() => (user_is_editing = true)}
					/>
				</div>
			</div>
		{/if}
	</section>

	{#if data.orders.length > 0}
		<section>
			<div class="max-w-layout mx-auto space-y-4">
				<h2 class="text-2xl font-bold leading-tight text-gray-800">
					{data.orders.length > 1 ? `Vergangene Bestellungen` : `Vergangene Bestellung`}
				</h2>
				{#each data.orders as order}
					<div class="border-accent relative mx-auto overflow-x-auto border px-2 py-4">
						<h3 class="font-body text-accent mb-2 text-base">
							Bestellung #{order.display_id} ({order.status}) - {order.shipping_methods[0]
								.shipping_option.name}
						</h3>

						<table class="w-full text-left text-sm text-gray-500 rtl:text-right">
							<thead class="bg-accent-100 text-xs uppercase text-gray-700">
								<tr>
									<th scope="col" class="px-6 py-3">Produkt</th>
									<th scope="col" class="px-6 py-3">Anzahl</th>
									<th scope="col" class="px-6 py-3">Modell</th>
									<th scope="col" class="px-6 py-3">Preis</th>
								</tr>
							</thead>
							<tbody>
								{#each order.items as item}
									<tr class="border-b bg-white dark:border-gray-700">
										<th
											scope="row"
											class="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium text-gray-900"
										>
											<img src={item.thumbnail} alt="" class="h-12 w-12" />
											{item.title}
										</th>
										<td class="px-6 py-4">{item.quantity}</td>

										<td class="px-6 py-4">{item.description}</td>
										{#if item.total && item.tax_total}
											<td class="px-6 py-4">{format_price(item.total + item.tax_total)}</td>
										{/if}
									</tr>
								{/each}
							</tbody>
							<tfoot>
								<tr>
									<td class="py-1">Bestelldatum:</td>
									<td class="py-1"
										>{format_date_to_german(new Date(order.created_at), {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}</td
									>
								</tr>
								<tr>
									<td class="py-1">Anzahl Artikel:</td>
									<td class="py-1">{order.items.length}</td>
								</tr>
								<tr>
									<td class="py-1">Preis:</td>
									{#if order.total && order.tax_total}
										<td class="py-1">{format_price(order.total + order.tax_total)}</td>
									{/if}
								</tr>
								<tr>
									<td class="py-1">Mwst.:</td>
									{#if order.tax_total}
										<td class="py-1">{format_price(order.tax_total)}</td>
									{/if}
								</tr>
							</tfoot>
						</table>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
