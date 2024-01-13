<script lang="ts">
	import debounce from 'just-debounce-it';

	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';

	import Button from '$lib/components/primitives/Button.svelte';
	import X from '~icons/ph/x';
	import { crossfade, slide, fade } from 'svelte/transition';
	import * as Results from './_components';
	import { queryParam } from 'sveltekit-search-params';
	import { writable } from 'svelte/store';

	export let data: PageData;

	let hits = data.hits;
	let search_param = '';

	const q = queryParam('q', {
		encode: (value) => value.trim(),
		decode: (value) => value,
		defaultValue: ''
	});

	//create a store which saves the last 3 search queries
	const recentSearches = writable<string[]>([]);
	const MAX_RECENT_SEARCHES = 10;
	function add_to_react_searches(query: string) {
		recentSearches.update((searches) => {
			//if search is already in the list, don't add it again, check with toLowerCase and trim
			//if search is longer than 10, remove the oldest one
			if (searches.map((s) => s.toLowerCase().trim()).includes(query.toLowerCase().trim())) {
				return searches;
			}

			if (searches.length >= MAX_RECENT_SEARCHES) {
				searches.shift();
			}

			return [...searches, query];
		});
	}
	const SUGGESTED_SEARCHES = ['Z.lite', 'Z.', 'Z.essential'] as const;

	let is_searching = false;

	let form_ref: HTMLFormElement;

	const debounced_submit = debounce(() => {
		// not supported in all browsers
		$q = search_param;
		if (typeof HTMLFormElement.prototype.requestSubmit == 'function') {
			form_ref.requestSubmit();
		}
	}, 400);

	const clear = () => {
		form_ref.q.value = '';
		debounced_submit();
	};

	const submit: SubmitFunction = async ({ formData }) => {
		const query = formData.get('q') as string;
		q.set(query);

		is_searching = true;
		return async ({ update, result }) => {
			switch (result.type) {
				case 'success':
					hits = result.data!.hits;
					break;

				default:
					hits = [];
					break;
			}

			await update({ reset: false }).then(() => {
				is_searching = false;
				add_to_react_searches(query);
			});
		};
	};

	const [send, receive] = crossfade({
		duration: 200,
		fallback(node) {
			return fade(node, {
				duration: 300
			});
		}
	});
</script>

<section class="bg-accent text-white">
	<div class="border-primary border py-px">
		<div
			class="bg-primary mx-auto flex min-h-screen w-full max-w-screen-lg flex-col gap-px lg:grid lg:grid-cols-12 [&_>div]:p-4"
		>
			<div class="bg-accent flex flex-col items-stretch lg:col-span-3">
				<form
					class="flex gap-2 py-6 lg:py-0"
					bind:this={form_ref}
					method="POST"
					use:enhance={submit}
				>
					<label for="q" class="relative flex-1"
						><span class="sr-only">Suche</span>
						<!-- svelte-ignore a11y-autofocus -->
						<input
							id="q"
							type="search"
							name="q"
							autofocus={true}
							autocomplete="off"
							bind:value={search_param}
							on:input={debounced_submit}
							class="block w-full rounded-lg border border-gray-200 px-4 py-3 !text-[16px] text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 focus:[&::-webkit-search-cancel-button:after]:hidden"
							aria-label="Search"
							placeholder="Suche..."
						/>

						{#if $q}
							<button
								type="button"
								class="absolute bottom-0 right-2 top-0 my-auto transform"
								transition:slide={{ duration: 200, axis: 'x' }}
								on:click={clear}
							>
								<X class="text-primary h-4 w-4" />
								<span class="sr-only">Suchanfrage leeren</span>
							</button>
						{/if}
					</label>
				</form>
				<div class="mt-px flex flex-col gap-2 self-center lg:self-start">
					<h2 class="mr-4 mt-1 text-xs font-light">Vorgeschlagene Suchanfragen:</h2>
					<ul class="flex items-start gap-4 lg:flex-col">
						{#each SUGGESTED_SEARCHES as suggested_search}
							<li>
								<Button
									class="px-1 py-px"
									colorway="secondary"
									size="xsmall"
									disabled={is_searching}
									on:click={() => {
										form_ref.q.value = suggested_search;
										form_ref.requestSubmit();
									}}
								>
									{suggested_search}
								</Button>
							</li>
						{/each}
					</ul>

					{#if $recentSearches.length > 0}
						<h2 class="mr-4 mt-1 hidden text-xs font-light lg:block">Letzte Suchanfragen:</h2>
						<ul class=" hidden items-start gap-4 lg:flex lg:flex-col">
							{#each $recentSearches as recent_search}
								<li>
									<Button
										class="px-1 py-px"
										colorway="ghost"
										size="xsmall"
										disabled={is_searching}
										on:click={() => {
											form_ref.q.value = recent_search;
											form_ref.requestSubmit();
										}}
									>
										{recent_search}
									</Button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
			<div class="bg-accent flex-1 lg:col-span-9">
				<div class="flex flex-col gap-4">
					<div>
						<h3 class="text-xl font-semibold">Suchergebnisse</h3>

						{#if hits.length > 0 && !is_searching}
							<p class="text-accent-100">
								{hits.length}
								{hits.length === 1 ? 'Ergebniss' : 'Ergebnisse'}
							</p>
						{:else if is_searching}
							<p class="text-accent-100">Suche...</p>
						{:else}
							<p class="text-accent-100">Keine Ergebnisse</p>
						{/if}
					</div>

					<div class="min-h-52">
						<Results.Root results={hits} let:result>
							<div
								class="relative flex aspect-square overflow-hidden rounded-lg lg:max-w-[200px]"
								in:receive={{ key: result.id }}
								out:send={{ key: result.id }}
							>
								<Results.Item {result} />
							</div>
						</Results.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	[type='search']::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}
</style>
