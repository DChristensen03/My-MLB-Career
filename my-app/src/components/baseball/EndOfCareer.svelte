<script>
	export let stats = {},
		mvps,
		allStarAppearances,
		worldSeries,
		totalSalary;

	let name = '',
		loading = false;

	async function reset() {
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
				name
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
	<div data-grid="row">
		<div class="col-12">
			<label for="name">Name: </label>
			<input name="name" id="name" type="text" maxlength="10" bind:value={name} />
		</div>
	</div>
	<div data-grid="row">
		<div class="col-12">
			<input
				class="red {loading ? 'loading' : ''}"
				type="submit"
				value="Reset"
				disabled={name === '' || loading}
			/>
		</div>
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
