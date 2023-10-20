<script>
	import { onMount } from 'svelte';
	let mvps = [],
		salaries = [],
		worldSeries = [],
		averages = [],
		homeRuns = [],
		drs = [];

	let show_stats = 'personal',
		amount = 5;

	$: show_stats, amount, updateStats();

	async function updateStats() {
		const response = await fetch(`/baseball/stats/${show_stats}`, {
			method: 'POST',
			body: JSON.stringify({
				userid: localStorage.getItem('userid'),
				amount
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const stats = await response.json();
		mvps = stats.baseball_career_mvps;
		salaries = stats.baseball_career_salary;
		worldSeries = stats.baseball_career_world_series;
		averages = stats.baseball_career_average;
		homeRuns = stats.baseball_career_home_runs;
		drs = stats.baseball_career_defensive_runs_saved;
	}

	onMount(async () => {
		updateStats();
	});
</script>

<div data-grid="row center-center">
	<div class="field col-3">
		<label for="show_stats">Show Stats</label>
		<select name="show_stats" id="show_stats" bind:value={show_stats}>
			<option value="personal">Personal</option>
			<option value="global">Global</option>
		</select>
	</div>
	{#if show_stats == 'global'}
		<div class="field col-1">
			<label for="amount">Show Stats</label>
			<select name="amount" id="amount" bind:value={amount}>
				<option selected value="5">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="25">25</option>
			</select>
		</div>
	{/if}
</div>

<div>
	<div data-grid="ca-space-around center-center">
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>MVPs</th>
				</tr>
				{#each mvps as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>{stat.total}</th>
					</tr>
				{/each}
			</table>
		</div>
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>Salary</th>
				</tr>
				{#each salaries as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>${stat.total > 9 ? stat.total / 10 + 'M' : stat.total * 100 + 'k'}</th>
					</tr>
				{/each}
			</table>
		</div>
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>World Series</th>
				</tr>
				{#each worldSeries as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>{stat.total}</th>
					</tr>
				{/each}
			</table>
		</div>
	</div>

	<div data-grid="ca-space-around center-center">
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>Average</th>
				</tr>
				{#each averages as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>.{stat.average}</th>
					</tr>
				{/each}
			</table>
		</div>
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>Home Runs</th>
				</tr>
				{#each homeRuns as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>{stat.total}</th>
					</tr>
				{/each}
			</table>
		</div>
		<div class="col-4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>Name</th>
					<th>DRS</th>
				</tr>
				{#each drs as stat, i}
					<tr>
						<th>{i + 1}</th>
						<th>{stat.name}</th>
						<th>{stat.total}</th>
					</tr>
				{/each}
			</table>
		</div>
	</div>
</div>
