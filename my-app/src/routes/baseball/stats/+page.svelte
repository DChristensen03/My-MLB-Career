<script>
	import { onMount } from 'svelte';
	let mvps = [],
		salaries = [],
		worldSeries = [],
		averages = [],
		homeRuns = [],
		drs = [];

	onMount(async () => {
		const response = await fetch('/baseball/stats', {
			method: 'POST',
			body: JSON.stringify({
				userid: localStorage.getItem('userid')
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
	});
</script>

<div data-grid="row center-center">
	<div class="col-3">
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
	<div class="col-3">
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
	<div class="col-3">
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

<div data-grid="row center-center">
	<div class="col-3">
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
	<div class="col-3">
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
	<div class="col-3">
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
