<script lang="ts">
	import ApplePay from './payment_options/ApplePay.svelte';
	import MasterCard from './payment_options/MasterCard.svelte';
	import PayPal from './payment_options/PayPal.svelte';
	import Visa from './payment_options/Visa.svelte';

	let form_ref: HTMLFormElement;
	let payment_options = 0;
</script>

<div class="block">
	<h4>Zahlungsmethode</h4>
	<form method="POST" bind:this={form_ref}>
		<ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<li>
				<label
					class="elevation-2 flex items-center gap-4 rounded-lg py-2 pl-8 pr-4 no-underline"
					for="a"
				>
					<input type="radio" id="a" bind:group={payment_options} value={1} class="peer hidden" />
					<div class="border-accent aspect-1 peer-checked:bg-primary block h-4 w-4 border"></div>
					<ApplePay />
				</label>
			</li>
			<li>
				<label
					class="elevation-2 flex items-center gap-4 rounded-lg py-2 pl-8 pr-4 no-underline"
					for="b"
				>
					<input type="radio" id="b" bind:group={payment_options} value={2} class="peer hidden" />
					<div class="border-accent aspect-1 peer-checked:bg-primary block h-4 w-4 border"></div>
					<MasterCard />
				</label>
			</li>
			<li>
				<label
					class="elevation-2 flex items-center gap-4 rounded-lg py-2 pl-8 pr-4 no-underline"
					for="c"
				>
					<input type="radio" id="c" bind:group={payment_options} value={3} class="peer hidden" />
					<div class="border-accent aspect-1 peer-checked:bg-primary block h-4 w-4 border"></div>
					<Visa />
				</label>
			</li>
			<li>
				<label
					class="elevation-2 flex items-center gap-4 rounded-lg py-2 pl-8 pr-4 no-underline"
					for="d"
				>
					<input type="radio" id="d" bind:group={payment_options} value={4} class="peer hidden" />
					<div class="border-accent aspect-1 peer-checked:bg-primary block h-4 w-4 border"></div>
					<PayPal />
				</label>
			</li>
		</ul>
	</form>
</div>
