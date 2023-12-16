<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { Discount } from './_validators';
	import Button from '$lib/components/primitives/Button.svelte';
	import { loading } from '$lib/stores/loading';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Discount>;

	const { form, enhance, constraints, delayed, message } = superForm(data, {
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
</script>

<div class="mx-auto mt-2 w-fit">
	{#if !open}
		<Button size="xsmall" colorway="accent" on:click={() => (open = true)}>
			Gutscheincode hinzufügen
		</Button>
	{:else}
		<form method="POST" use:enhance action="?/add_discount" class="relative flex flex-col gap-4">
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

			<Button size="xsmall" colorway="accent" type="submit" disabled={$delayed} aria-busy={$delayed}>
				{$delayed ? 'Überprüfe...' : 'Überprüfen'}
			</Button>
			<button class="text-xs" on:click|preventDefault={() => (open = false)}>Abbrechen </button>
		</form>
	{/if}
</div>
