<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ComponentProps } from 'svelte';
	import { loading } from '$lib/stores/loading';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/primitives/Button.svelte';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends ComponentProps<Button> {}

	const logout: SubmitFunction = async () => {
		$loading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Erfolgreich ausgeloggt', {
					description: 'Bis zum nächsten Mal!',
					descriptionClass: '!text-xs',
					invert: true,
					action: {
						label: 'Schließen',
						onClick: (e) => {
							toast.dismiss(e.detail);
						}
					}
				});
			}

			$loading = false;
			update();
		};
	};
</script>

<form action="/auth/logout" method="POST" class="contents" use:enhance={logout}>
	<Button type="submit" colorway="secondary" size="xsmall" {...$$restProps}>Ausloggen</Button>
</form>
