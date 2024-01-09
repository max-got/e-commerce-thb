<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { DiscountFormZod } from '../../_validators';
	import Button from '$lib/components/primitives/Button.svelte';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import type { Cart } from '@medusajs/medusa';
	import { enhance } from '$app/forms';

	import { format_price } from '$lib/utils/shop';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form_data: SuperValidated<DiscountFormZod>;
	export let current_cart_discount: Cart['discounts'][number] | undefined = undefined;

	const {
		form,
		enhance: add_enhance,
		constraints,
		delayed,
		message
	} = superForm(form_data, {
		onSubmit: () => {
			$loading = true;
		},
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Gutscheincode wurde angewendet.', {
						invert: true
					});
					break;
			}
			$loading = false;
		}
	});

	let open = false;

	let form_ref: HTMLFormElement;
	const delete_enhance: SubmitFunction = async () => {
		$loading = true;
		$form.discount = '';

		return async ({ update, result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Gutscheincode wurde entfernt.', {
						invert: true
					});
					break;

				default:
					toast.error('Gutscheincode konnte nicht entfernt werden.', {
						invert: true
					});
					break;
			}

			open = false;
			$loading = false;
			await update();
		};
	};
</script>

{#if !open && !current_cart_discount?.code}
	<Button size="xsmall" colorway="white" on:click={() => (open = true)}>
		Gutscheincode hinzufügen
	</Button>
{:else if current_cart_discount && current_cart_discount.code}
	<form
		method="POST"
		use:enhance={delete_enhance}
		action="?/delete_discount"
		class="relative flex flex-col items-start gap-2 px-2 py-4"
	>
		<p>
			Gutscheincode: {current_cart_discount.code} ({format_price(
				current_cart_discount.rule.value * -1
			)})
		</p>
		<button class="text-xs underline" on:click={() => (open = true)}>
			Gutscheincode entfernen</button
		>
	</form>
{:else}
	<form method="POST" use:add_enhance action="?/add_discount" class="relative flex flex-col gap-4">
		<div class=" flex flex-col-reverse gap-2">
			<input
				id="discount"
				name="discount"
				type="text"
				aria-invalid={$form.discount ? 'true' : undefined}
				class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				bind:value={$form.discount}
				{...$constraints.discount}
			/>
			<label for="discount" class="block text-sm font-medium leading-6 text-gray-900"
				>Gutscheincode</label
			>
		</div>
		{#if $message}
			<span class="text-primary text-xs">{$message}</span>
		{/if}

		<div class="flex gap-4">
			{#if !$delayed}
				<Button
					size="xsmall"
					class="w-full"
					colorway="white"
					type="button"
					on:click={() => (open = false)}
				>
					Abbrechen
				</Button>
			{/if}
			<Button
				size="xsmall"
				colorway="accent"
				type="submit"
				class="w-full"
				disabled={$delayed}
				aria-busy={$delayed}
			>
				{$delayed ? 'Überprüfe...' : 'Überprüfen'}
			</Button>
		</div>
	</form>
{/if}
