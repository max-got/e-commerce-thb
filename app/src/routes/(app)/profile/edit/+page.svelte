<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const format_date_to_german = (
		date: Date,
		options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
	) => {
		//check if browser supports Intl.DateTimeFormat
		if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
			return date.toLocaleDateString('de-DE', options);
		}

		return new Intl.DateTimeFormat('de-DE', options).format(date);
	};
</script>

<pre>{JSON.stringify(data.user, null, 2)}</pre>
<!-- Code block starts -->
<div
	class=" border-secondary mx-auto mb-4 flex flex-col items-start justify-between border-b pb-2 md:flex-row md:items-center"
>
	<div>
		<h4 class="text-2xl font-bold leading-tight text-gray-800">Dein Profil</h4>
		<ul
			aria-label="current Status"
			class="mt-3 flex flex-col items-start text-sm text-gray-600 dark:text-gray-400 md:flex-row md:items-center"
		>
			<li class="mr-4 flex items-center">
				<div class="mr-1">
					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg1.svg"
						alt="Active"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg1dark.svg"
						alt="Active"
					/>
				</div>
				<span>Active</span>
			</li>
			<li class="mr-4 mt-4 flex items-center md:mt-0">
				<div class="mr-1">
					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg2.svg"
						alt="Trending"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg2dark.svg"
						alt="Trending"
					/>
				</div>
				<span>{data.user.orders.length > 0 ? data.user.orders.length : 'Noch keine Bestellungen'}</span>
			</li>
			<li class="mt-4 flex items-center md:mt-0">
				<div class="mr-1">
					<img
						class="dark:hidden"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg3.svg"
						alt="date"
					/>
					<img
						class="hidden dark:block"
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/simple_with_sub_text_and_border-svg3dark.svg"
						alt="date"
					/>
				</div>
				<span>Dabei seit: {format_date_to_german(new Date(data.user.created_at))}</span>
			</li>
		</ul>
	</div>
	<div class="mt-6 md:mt-0">
		<a
			class="bg-accent hover:text-secondary-200 hover:bg-accent-800 elevation-2 hover:elevation-1 flex h-fit items-center rounded-md px-2 py-1 text-sm font-medium text-white no-underline transition-all hover:scale-[0.98]"
			href="/"
		>
			Zurück
		</a>
	</div>
</div>
<!-- Code block ends -->

<form>
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				Use a permanent address where you can receive mail.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
						>Vorname</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="first-name"
							id="first-name"
							autocomplete="given-name"
							value={data.user.first_name}
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
						>Nachname</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							value={data.user.last_name}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-4">
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>E-Mail Addresse</label
					>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							disabled
							autocomplete="email"
							value={data.user.email}
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
					<div class="mt-2">
						<select
							id="country"
							name="country"
							autocomplete="country-name"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
						>
							<option>United States</option>
							<option>Canada</option>
							<option>Mexico</option>
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="street-address" class="block text-sm font-medium leading-6 text-gray-900"
						>Street address</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="street-address"
							id="street-address"
							autocomplete="street-address"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-2 sm:col-start-1">
					<label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
					<div class="mt-2">
						<input
							type="text"
							name="city"
							id="city"
							autocomplete="address-level2"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label for="region" class="block text-sm font-medium leading-6 text-gray-900"
						>State / Province</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="region"
							id="region"
							autocomplete="address-level1"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
						>ZIP / Postal code</label
					>
					<div class="mt-2">
						<input
							type="text"
							name="postal-code"
							id="postal-code"
							autocomplete="postal-code"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				We'll always let you know about important changes, but you pick what else you want to hear
				about.
			</p>

			<div class="mt-10 space-y-10">
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
					<div class="mt-6 space-y-6">
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="comments"
									name="comments"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="comments" class="font-medium text-gray-900">Comments</label>
								<p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
							</div>
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="candidates"
									name="candidates"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="candidates" class="font-medium text-gray-900">Candidates</label>
								<p class="text-gray-500">Get notified when a candidate applies for a job.</p>
							</div>
						</div>
						<div class="relative flex gap-x-3">
							<div class="flex h-6 items-center">
								<input
									id="offers"
									name="offers"
									type="checkbox"
									class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
							</div>
							<div class="text-sm leading-6">
								<label for="offers" class="font-medium text-gray-900">Offers</label>
								<p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
					<p class="mt-1 text-sm leading-6 text-gray-600">
						These are delivered via SMS to your mobile phone.
					</p>
					<div class="mt-6 space-y-6">
						<div class="flex items-center gap-x-3">
							<input
								id="push-everything"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-everything" class="block text-sm font-medium leading-6 text-gray-900"
								>Everything</label
							>
						</div>
						<div class="flex items-center gap-x-3">
							<input
								id="push-email"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-email" class="block text-sm font-medium leading-6 text-gray-900"
								>Same as email</label
							>
						</div>
						<div class="flex items-center gap-x-3">
							<input
								id="push-nothing"
								name="push-notifications"
								type="radio"
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900"
								>No push notifications</label
							>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
		<button
			type="submit"
			class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>Save</button
		>
	</div>
</form>

<pre>{JSON.stringify(data, null, 2)}</pre>
