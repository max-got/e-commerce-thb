<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/primitives/Button.svelte';
	import { loading } from '$lib/stores/loading';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let ready = false;

	const complete_order: SubmitFunction = async () => {
		$loading = true;
		// do something before the form is submitted

		return async ({ update, result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Bestellung erfolgreich abgeschlossen.');
					break;

				default:
					toast.error('Bestellung konnte nicht abgeschlossen werden.');
					break;
			}
			$loading = false;
			await update();
		};
	};
</script>

{#if ready}
	<form action="?/complete" method="POST" use:enhance={complete_order} class="flex flex-col gap-2">
		<Button
			type="submit"
			colorway="accent"
			size="medium"
			disabled={$loading}
			aria-disabled={$loading}
			aria-busy={$loading}
		>
			Zahlungspflichtig bestellen</Button
		>
		<p class="font-display whitespace-normal pt-1 text-sm">
			Durch einen Klick auf „Zahlungspflichtig bestellen“ stimmst du den
			<a href="/terms-and-conditions" target="_blank" class="underline">AGB</a> und der
			<a href="/privacy-policy" target="_blank" class="underline">Datenschutzerklärung</a>
			zu.
		</p>
	</form>
{:else}
	<p class="font-display whitespace-normal pt-1 text-sm">
		Du musst alle Felder ausfüllen, um die Bestellung abzuschließen.
	</p>
{/if}
