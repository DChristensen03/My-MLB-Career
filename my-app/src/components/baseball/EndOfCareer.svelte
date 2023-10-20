<script>
	import { onMount } from 'svelte';

	export let stats = {},
		mvps,
		allStarAppearances,
		worldSeries,
		totalSalary;

	let name = '';

	async function reset() {
		const response = await fetch('/baseball/game/checkStats', {
			method: 'POST',
			body: JSON.stringify({
				mvps,
				allStarAppearances,
				worldSeries,
				totalSalary,
				stats,
				userid: localStorage.getItem('userid'),
				name
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		window.location.reload();
	}
</script>

<form on:submit|preventDefault={reset}>
	<div data-grid="row">
		<div class="col-12">
			<label for="name">Name: </label>
			<input name="name" id="name" type="text" bind:value={name} />
		</div>
	</div>
	<div data-grid="row">
		<div class="col-12">
			<input class="red" type="submit" value="Reset" disabled={name === ''} />
		</div>
	</div>
</form>
