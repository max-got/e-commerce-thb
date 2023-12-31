<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Cart } from '@medusajs/medusa';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	import TrashCan from '~icons/ph/trash';
	import Button from '../primitives/Button.svelte';

	import { format_price } from '$lib/utils/shop';

	import { getContext } from 'svelte';
	import type { StyleContext } from './wrapper.svelte';
	import { invalidateAll } from '$app/navigation';

	export let item: Cart['items'][0];

	let style = getContext<StyleContext>('style');

	let form: HTMLFormElement;

	const remove_item: SubmitFunction = async () => {
		$loading = true;

		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.message('Erfolgreich aktualisiert', {
					descriptionClass: '!text-xs',
					invert: true
				});
			}

			$loading = false;
			await update();
		};
	};

	const update_item: SubmitFunction = async () => {
		$loading = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.message('Erfolgreich aktualisiert', {
						descriptionClass: '!text-xs',
						invert: true
					});
					break;
				case 'failure':
					if (result.data?.message === 'insufficient_inventory') {
						toast.warning(`Nicht genügend Lagerbestand`, {
							descriptionClass: '!text-xs',
							invert: true
						});
						invalidateAll();
					} else {
						toast.error(`Fehler beim Aktualisieren`, {
							descriptionClass: '!text-xs',
							invert: true
						});
					}
					break;
			}

			$loading = false;

			await update({ reset: false });
		};
	};
</script>

{#key item}
	<li class="gap-4 py-2 transition-all [&_.cb]:last:hidden">
		<div
			class="cb from-accent via-accent-300/60 to-accent col-span-3 block h-px w-full bg-gradient-to-r"
		></div>
		<img src={item.thumbnail} alt="" class="h-16 w-16 rounded object-cover [grid-area:image]" />
		<div class="xs:ml-0 ml-auto self-start [grid-area:title;]">
			<h3 class="text-base font-bold leading-none">{item.title}</h3>
			{#if item.variant.product.subtitle}
				<p class="text-secondary-200 text-[10px]">
					{item.variant.product.subtitle}
				</p>
			{/if}
			<div class="col-start-1 col-end-1 row-start-1 row-end-1">
				<p class="text-sm">
					{item.variant.title}
				</p>
			</div>
		</div>

		{#if $style !== 'checkout'}
			<form
				method="POST"
				class="ml-auto w-fit self-start [grid-area:quantityForm;]"
				action="/s/cart?/update"
				use:enhance={update_item}
				bind:this={form}
			>
				<label for="quantity" class="sr-only">Anzahl</label>

				<select
					name="quantity"
					id="quantity"
					class="focus:ring-primary-400 focus:ring-offset-primary-400 w-auto rounded-md px-5 py-1 text-sm bg-blend-luminosity focus:outline-none focus:ring-1 focus:ring-offset-1"
					on:change={() => form.requestSubmit()}
					disabled={$loading ? true : undefined}
				>
					{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number}
						<option value={number} selected={item.quantity === number}>{number}</option>
					{/each}
				</select>

				<input type="hidden" name="item_id" value={item.id} />
				<input type="hidden" name="quantity" bind:value={item.quantity} />
			</form>
		{/if}
		{#if item.total}
			<p class="flex gap-2 text-right text-xs [grid-area:price;]">
				<span>Preis:</span>
				{format_price(item.total)}
			</p>
		{/if}

		<p class="flex gap-2 text-xs [grid-area:quantity;]">
			<span>Anzahl:</span>
			{item.quantity}
		</p>
		{#if $style !== 'checkout'}
			<form
				class="justify-self-end [grid-area:delete;]"
				method="POST"
				action="/s/cart?/remove"
				use:enhance={remove_item}
			>
				<Button class="px-1 py-1" colorway={'accent'} size="xsmall" icon={TrashCan} type="submit"
					>Entfernen</Button
				>

				<input type="hidden" name="item_id" value={item.id} />
			</form>
		{/if}
	</li>
{/key}

<style>
	li {
		display: grid;
		grid-template-areas:
			'image title quantityForm'
			'delete quantity price';
		grid-template-columns: 1fr 2fr 1fr;

		align-items: center;
	}

	@media (max-width: 475px) {
		li {
			grid-template-areas:
				'image title'
				'quantity quantityForm'
				'price delete';
			grid-template-columns: 1fr 2fr;
			grid-template-rows: auto auto auto auto auto;
		}
	}
</style>
