<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ShippingOption } from '../../_validators';
	import { format_price } from '$lib/utils/shop';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import type { StoreShippingOptionsListRes } from '@medusajs/medusa';
	import { page } from '$app/stores';
	import type { Cart } from '@medusajs/medusa';

	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let cart: Cart;

	export let shipping_options: StoreShippingOptionsListRes['shipping_options'] = [];

	export let form_data: SuperValidated<ShippingOption>;

	const dispatch = createEventDispatcher<{
		editing: true;
	}>();

	const dispatch_editing = () => {
		dispatch('editing', true);
	};

	let form_ref: HTMLFormElement;
	let editing = false;
	const { form, enhance } = superForm(form_data, {
		onSubmit: () => {
			$loading = true;

			$page.data.cart?.shipping_methods?.forEach((method) => {
				if (method.id === $form.shipping_option) {
					$page.data.cart!.shipping_methods[0] = method;
				}
			});
		},
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Versandoption erfolgreich ausgewählt', {
						invert: true
					});
					break;
				default:
					toast.error('Versandoption konnte nicht ausgewählt werden', {
						invert: true
					});
					break;
			}

			editing = false;
			$loading = false;
		}
	});

	const cast_string = (value: string | unknown) => value as string;
</script>

{#if cart.shipping_methods?.length === 0 || editing}
	<form
		method="POST"
		use:enhance
		action="?/add_shipping_option"
		class="grid gap-4 text-left"
		bind:this={form_ref}
		on:change={() => form_ref.requestSubmit()}
	>
		<ul class="grid gap-6">
			{#each shipping_options as shipping (shipping.id)}
				<li class="transition-transform hover:scale-[.98]" transition:slide>
					<input
						type="radio"
						id={shipping.id}
						name="shipping_option"
						bind:group={$form.shipping_option}
						value={shipping.id}
						checked={$form.shipping_option === shipping.id}
						class="peer hidden"
						disabled={$loading || undefined}
						required
					/>

					<label
						for={shipping.id}
						class="
					peer-checked:border-primary
					peer-checked:bg-accent-50/40
					border-accent group
					inline-flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 no-underline after:!content-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
					>
						<div class="flex w-full flex-col">
							{#if shipping.name && shipping.amount !== undefined && shipping.amount !== null}
								<div class="mb-2 flex justify-between">
									<p class="font-display name w-full text-sm group-checked:!font-bold">
										{shipping.name}
									</p>
									<p class="font-display name text w-full text-end peer-checked:!font-bold">
										{format_price(shipping.amount + shipping.tax_amount)}
									</p>
								</div>
							{/if}
							{#if shipping.metadata?.description}
								<p class="w-full text-xs">{shipping.metadata.description}</p>
							{/if}
							{#if shipping.metadata?.delivery_time}
								<p class="mt-2 w-full text-xs">
									Lieferzeit: {cast_string(shipping.metadata.delivery_time).replace('_', ' bis ')} Tag(e)
								</p>
							{/if}
						</div>
					</label>
				</li>
			{/each}
		</ul>
	</form>
{:else}
	{#each cart.shipping_methods as method}
		{@const { shipping_option: shipping } = method}
		<div
			class="border-accent group relative inline-flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 no-underline"
		>
			<div class="absolute bottom-0 right-2">
				<button
					class="text-accent-400 text-xs font-light"
					on:click|preventDefault={() => {
						dispatch_editing(), (editing = true);
					}}
				>
					Bearbeiten
				</button>
			</div>
			<div class="flex w-full flex-col">
				{#if shipping.name && shipping.amount !== undefined && shipping.amount !== null}
					<div class="mb-2 flex justify-between">
						<p class="font-display name w-full text-sm group-checked:!font-bold">
							{shipping.name}
						</p>
						{#if method.total}
							<p class="font-display name text w-full text-end peer-checked:!font-bold">
								{format_price(method.total)}
							</p>
						{/if}
					</div>
				{/if}
				{#if shipping.metadata?.description}
					<p class="w-full text-xs">{shipping.metadata.description}</p>
				{/if}
				{#if shipping.metadata?.delivery_time}
					<p class="mt-2 w-full text-xs">
						Lieferzeit: {cast_string(shipping.metadata.delivery_time).replace('_', ' bis ')} Tag(e)
					</p>
				{/if}
			</div>
		</div>
	{/each}
{/if}
