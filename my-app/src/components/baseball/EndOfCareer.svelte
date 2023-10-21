<script>
	import { Label, Button, Input } from 'flowbite-svelte';

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

<form on:submit|preventDefault={reset}>
	<div>
		<Label for="name">Name:</Label>
		<Input name="name" id="name" type="text" maxlength="25" bind:value={name} />
	</div>
	<div>
		<Button class={loading ? 'loading' : ''} type="submit" disabled={name === '' || loading}>
			Reset
		</Button>
	</div>
</form>

<style>
	.loading {
		background-color: #ffffff;
		background-image: url('https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif');
		background-size: 15px 15px;
		background-position: right center;
		background-repeat: no-repeat;
	}
</style>
