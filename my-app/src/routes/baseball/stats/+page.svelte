<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import {
		Input,
		Label,
		Select,
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import MyTableBodyCell from '$lib/MyTableBodyCell.svelte';

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
		if (browser) {
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
	}

	onMount(async () => {
		updateStats();
	});
</script>

<div class="flex flex-row justify-center gap-1">
	<div>
		<Label>
			Show Stats
			<Select
				items={[
					{ value: 'personal', name: 'Personal' },
					{ value: 'global', name: 'Global' }
				]}
				placeholder=""
				size="sm"
				bind:value={show_stats}
			/>
		</Label>
	</div>
	{#if show_stats == 'global'}
		<div>
			<Label>
				Amount
				<Select
					items={[
						{ value: 5, name: '5' },
						{ value: 10, name: '10' },
						{ value: 15, name: '15' },
						{ value: 20, name: '20' },
						{ value: 25, name: '25' }
					]}
					placeholder=""
					size="sm"
					bind:value={amount}
				/>
			</Label>
		</div>
	{/if}
</div>
<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>MVPs</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each mvps as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell>{stat.total}</MyTableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Salary</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each salaries as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell
							>${stat.total > 9 ? stat.total / 10 + 'M' : stat.total * 100 + 'k'}</MyTableBodyCell
						>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>World Series</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each worldSeries as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell>{stat.total}</MyTableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>

	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Average</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each averages as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell>.{stat.average}</MyTableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Home Runs</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each homeRuns as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell>{stat.total}</MyTableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div>
		<Table shadow striped={true}>
			<TableHead>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>DRS</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each drs as stat, i}
					<TableBodyRow>
						<MyTableBodyCell>{i + 1}</MyTableBodyCell>
						<MyTableBodyCell>{stat.name}</MyTableBodyCell>
						<MyTableBodyCell>{stat.total}</MyTableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
