<script>
	import { Label, Button, Input, Spinner } from 'flowbite-svelte';

	export let stats = {},
		mvps,
		allStarAppearances,
		worldSeries,
		totalSalary;

	let name = localStorage.getItem('name'),
		loading = false;

	async function reset() {
		localStorage.setItem('name', name);
		loading = true;
		await fetch('/baseball/game/checkStats', {
			method: 'POST',
			body: JSON.stringify({
				mvps,
				allStarAppearances,
				worldSeries,
				totalSalary,
				stats,
				userid: localStorage.getItem('userid'),
				name: name.substring(0, 25)
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		loading = false;
		window.location.reload();
	}
</script>

<div>
	<Label for="name">Name:</Label>
	<Input name="name" id="name" type="text" maxlength="25" bind:value={name} />
</div>
<div>
	<!-- There's no good way to disable conditionally -->
	<Button on:click={reset} class={loading ? 'loading' : ''} disabled={name === '' || loading}>
		Reset
		{#if loading}
			<Spinner size="4" class="ml-1" />
		{/if}
	</Button>
</div>
