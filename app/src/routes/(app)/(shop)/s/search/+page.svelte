<script lang="ts">
	import debounce from 'just-debounce-it';
	import { queryParam } from 'sveltekit-search-params';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { writable } from 'svelte/store';
	import Button from '$lib/components/primitives/Button.svelte';

	export let data: PageData;
	let hits = data?.hits || [];

	const q = queryParam(
		'q',
		{
			decode: (value) => value,
			encode: (value) => value,
			defaultValue: ''
		},
		{
			debounceHistory: 500,
			pushHistory: true
		}
	);

	//create a store which saves the last 3 search queries
	const recentSearches = writable<string[]>([]);
	const suggestedSearches = ['Breeze', 'Style', 'Elegance'];
	const MAX_RECENT_SEARCHES = 3;
	let form_submitted = false;

	//subscribe to the query param store
	$: q.subscribe((value) => {
		if (value && form_submitted && !$recentSearches.includes(value)) {
			//get the current value of the recent searches store
			const currentRecentSearches = $recentSearches;

			//if the current value is not the same as the new value
			if (currentRecentSearches[currentRecentSearches.length - 1] !== value) {
				//add the new value to the end of the array
				currentRecentSearches.push(value);

				//if the array is longer than the max length
				if (currentRecentSearches.length > MAX_RECENT_SEARCHES) {
					//remove the first item
					currentRecentSearches.shift();
				}

				//update the store with the new value
				recentSearches.set(currentRecentSearches);
			}
		}
	});

	let searchForm: HTMLFormElement;

	const debounced_change = debounce(
		() => {
			searchForm.requestSubmit();
		},
		500,
		false
	);

	const submit: SubmitFunction = async ({ cancel }) => {
		if (!$q || $q.trim() === '') {
			hits = [];
			cancel();
		}

		form_submitted = true;

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result && result.data && result.data.hits) {
						if (result.data.hits !== hits) {
							hits = result.data.hits;
						}
					}
					break;

				case 'failure':
					break;
				default:
					break;
			}

			await update({ reset: false, invalidateAll: false }).then(() => {
				form_submitted = false;
			});
		};
	};
</script>

<div class="mx-auto my-8 w-[100vw] px-6 md:px-8">
	<form bind:this={searchForm} action="?/search" method="POST" use:enhance={submit}>
		<label for="q" class="sr-only">Search</label>
		<input
			type="search"
			name="q"
			id="q"
			bind:value={$q}
			on:input={debounced_change}
			class="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
			aria-label="Search"
		/>
	</form>
	{#if $recentSearches.length > 0}
		<div class="mt-px flex items-center gap-4">
			<div class="flex flex-col gap-1">
				<h2 class="mr-4 mt-1 text-xs font-light">Letzte Suchanfragen:</h2>
				<p class="text-[10px]">
					<kbd
						class="bg-accent-50 font-display text-accent-400 border-accent-100 elevation-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px] opacity-100"
					>
						<span>⇧</span> + Klick
					</kbd> zum Löschen
				</p>
			</div>
			<ul class="flex flex-row items-start gap-4 self-start">
				{#each $recentSearches as recentSearch}
					<li>
						<Button
							class="px-1 py-px"
							colorway="accent"
							size="xsmall"
							on:click={(e) => {
								//if shift left click, delete from array
								if (e.shiftKey) {
									//get the current value of the recent searches store
									const currentRecentSearches = $recentSearches;

									//remove the item from the array
									currentRecentSearches.splice(currentRecentSearches.indexOf(recentSearch), 1);

									//update the store with the new value
									recentSearches.set(currentRecentSearches);
								} else {
									$q = recentSearch;
									debounced_change();
								}
							}}
						>
							{recentSearch}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<!--vorgeschlagene anfragen-->
		<div class="mt-px flex items-center">
			<h2 class="mr-4 mt-1 text-xs font-light">Vorgeschlagene Suchanfragen:</h2>
			<ul class="flex flex-row items-start gap-4">
				{#each suggestedSearches as suggestedSearche}
					<li>
						<Button
							class="px-1 py-px"
							colorway="accent"
							size="xsmall"
							on:click={() => {
								$q = suggestedSearche;
								debounced_change();
							}}
						>
							{suggestedSearche}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<div class="mt-8 grid grid-cols-2 gap-3">
		{#each hits as hit}
			<a
				href="/s/p/{hit.handle}"
				class="text-accent elevation-1 flex cursor-pointer items-center gap-2 overflow-hidden rounded-md border p-4 text-left font-bold no-underline hover:bg-stone-100"
			>
				<img src={hit.thumbnail} alt="" class="h-12 w-12 rounded-lg object-cover" width="300" />
				<h3 class="text-base">{hit.title}</h3>
			</a>
		{:else}
			{#if $q}
				<p>No results found.</p>
			{:else}
				<p>Enter a search term.</p>
			{/if}
		{/each}
	</div>
</div>
