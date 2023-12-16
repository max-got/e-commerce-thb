<script>
	export let message = 'Under Maintenance';
</script>

<main>
	<h1>{message}</h1>
	<p>We apologize for the inconvenience. Please check back later.</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
	}
</style>
