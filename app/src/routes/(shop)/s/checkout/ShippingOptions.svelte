<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ShippingOption } from './_validators';
	import { format_price } from '$lib/utils/shop';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';
	import type { StoreShippingOptionsListRes } from '@medusajs/medusa';
	import type { ShippingMethod } from '@medusajs/medusa';

	export let shipping_options: StoreShippingOptionsListRes['shipping_options'] = [];
	export let selected_shipping_option: ShippingMethod['shipping_option_id'] | undefined = undefined;
	export let data: SuperValidated<ShippingOption>;

	let form_ref: HTMLFormElement;
	const { form, enhance } = superForm(data, {
		onSubmit: () => {
			$loading = true;
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
			$loading = false;
		}
	});

	const cast_string = (value: string | unknown) => value as string;

	$: if (selected_shipping_option) {
		$form.shipping_option = selected_shipping_option;
	}
</script>

<form
	method="POST"
	use:enhance
	action="?/shipping_option"
	class="grid gap-4"
	bind:this={form_ref}
	on:change={() => form_ref.requestSubmit()}
>
	<ul class="grid gap-6">
		{#each shipping_options as option}
			<li class="elevation-2">
				<input
					type="radio"
					id={option.id}
					name="shipping_option"
					bind:group={$form.shipping_option}
					value={option.id}
					class="peer hidden"
					required
				/>
				<label
					for={option.id}
					class="
					peer-checked:border-primary
					peer-checked:bg-accent-50/40
					group inline-flex w-full cursor-pointer items-center justify-between rounded-lg border p-5 no-underline after:!content-none"
				>
					<div class="flex w-full flex-col">
						{#if option.name && option.amount !== undefined && option.amount !== null}
							<div class="mb-2 flex justify-between">
								<p class="font-display name w-full text-sm group-checked:!font-bold">
									{option.name}
								</p>
								<p class="font-display name text w-full text-end peer-checked:!font-bold">
									{format_price(option.amount)}
								</p>
							</div>
						{/if}
						{#if option.metadata?.description}
							<p class="w-full text-xs">{option.metadata.description}</p>
						{/if}
						{#if option.metadata?.delivery_time}
							<p class="mt-2 w-full text-xs">
								Lieferzeit: {cast_string(option.metadata.delivery_time).replace('_', ' bis ')} Tag(e)
							</p>
						{/if}
					</div>
				</label>
			</li>
		{/each}
	</ul>
</form>
