<script>
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
	<div data-grid="row">
		<div class="col-12">
			<label for="name">Name: </label>
			<input name="name" id="name" type="text" maxlength="25" bind:value={name} />
		</div>
	</div>
	<div data-grid="row">
		<div class="col-12">
			<input
				class="align-center cta-button {loading ? 'loading' : ''}"
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

	.cta-button {
		display: inline-block;
		background-color: #ff5722;
		color: #fff;
		text-align: center;
		padding: 15px 30px;
		margin-top: 20px;
		text-decoration: none;
		border-radius: 5px;
		font-size: 20px;
		transition: background-color 0.3s;
	}

	.cta-button:hover {
		background-color: #e64a19;
	}
</style>
