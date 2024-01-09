<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import * as PaymentOptions from './utils/payment-options';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';

	let form_ref: HTMLFormElement;

	let selected = 1;
	let payment_options = 0;

	const payment_dict = [
		{
			id: 1,
			name: 'Apple Pay',
			icon: PaymentOptions.ApplePay
		},
		{
			id: 2,
			name: 'Mastercard',
			icon: PaymentOptions.Mastercard
		},
		{
			id: 3,
			name: 'Visa',
			icon: PaymentOptions.Visa
		},
		{
			id: 4,
			name: 'Paypal',
			icon: PaymentOptions.Paypal
		}
	] as const;

	const add_payment_session: SubmitFunction = async () => {
		$loading = true;

		selected = payment_dict.find((option) => option.id === payment_options)?.id ?? 1;

		return async ({ update, result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Zahlungsmethode erfolgreich ausgewählt', {
						invert: true
					});
					break;
				default:
					toast.error('Zahlungsmethode konnte nicht ausgewählt werden', {
						invert: true
					});
					break;
			}

			$loading = false;
			await update();
		};
	};
</script>

<form
	method="POST"
	action="?/add_payment_session"
	bind:this={form_ref}
	on:change={() => form_ref.requestSubmit()}
	use:enhance={add_payment_session}
>
	<ul class="grid grid-cols-1 gap-6">
		{#each payment_dict as payment_option}
			<li class="transition-transform hover:scale-[.98]">
				<input
					type="radio"
					id={payment_option.name}
					bind:group={payment_options}
					value={payment_option.id}
					class="peer hidden"
					checked={selected === payment_option.id}
				/>

				<label
					class="
					peer-checked:border-primary
					peer-checked:bg-accent-50/40
					border-accent group
					inline-flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 no-underline after:!content-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
					for={payment_option.name}
				>
					<div class="flex w-full items-center justify-between">
						<p class="font-display name text-sm font-semibold uppercase group-checked:!font-bold">
							{payment_option.name}
						</p>

						<svelte:component this={payment_option.icon} />
					</div>
				</label>
			</li>
		{/each}
	</ul>
</form>
