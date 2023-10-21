<script>
<<<<<<< Updated upstream
=======
	import {
		Heading,
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import MyTableBodyCell from '$lib/MyTableBodyCell.svelte';

>>>>>>> Stashed changes
	export let stats, allStarAppearances, mvps, worldSeries, totalSalary;

	function getCareerAverage() {
		let total = 0;
		for (let stat of stats) {
			total += stat.average;
		}
		return Math.round(total / 12);
	}

	function getCareerDRS() {
		let total = 0;
		for (let stat of stats) {
			total += stat.drs;
		}
		return total;
	}

	function getCareerHomeRuns() {
		let total = 0;
		for (let stat of stats) {
			total += stat.home_runs;
		}
		return total;
	}
</script>

<div data-grid="row va-center">
	<div class="col-12 align-center">
		<h1>🏆Trophy Case🏆</h1>
	</div>
</div>
<<<<<<< Updated upstream
<div data-grid="row center-center">
	<div class="col-4">
		<table data-table="responsive striped">
			<thead>
				<tr>
					<th>All-Stars</th>
					<th>MVPs</th>
					<th>World Series</th>
					<th>Career Earnings</th>
					<th>Hall of Fame</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>{allStarAppearances}</th>
					<th>{mvps}</th>
					<th>{worldSeries}</th>
					<th>${totalSalary > 9 ? totalSalary / 10 + 'M' : totalSalary * 100 + 'k'}</th>
					{#if allStarAppearances + mvps * 4 >= 15}
						<th>✓</th>
					{:else}
						<th>✗</th>
=======
<div class="grid md:grid-cols-1 lg:grid-cols-2 sm:justify-items-center px-8">
	<div>
		<Table striped={true}>
			<TableHead>
				<TableHeadCell>All-Stars</TableHeadCell>
				<TableHeadCell>MVPs</TableHeadCell>
				<TableHeadCell>World Series</TableHeadCell>
				<TableHeadCell>Career Earnings</TableHeadCell>
				<TableHeadCell>Hall of Fame</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<MyTableBodyCell>{allStarAppearances}</MyTableBodyCell>
					<MyTableBodyCell>{mvps}</MyTableBodyCell>
					<MyTableBodyCell>{worldSeries}</MyTableBodyCell>
					<MyTableBodyCell
						>${totalSalary > 9 ? totalSalary / 10 + 'M' : totalSalary * 100 + 'k'}</MyTableBodyCell
					>
					{#if allStarAppearances + mvps * 4 >= 15}
						<MyTableBodyCell>✓</MyTableBodyCell>
					{:else}
						<MyTableBodyCell>✗</MyTableBodyCell>
>>>>>>> Stashed changes
					{/if}
				</tr>
			</tbody>
		</table>
	</div>
<<<<<<< Updated upstream
	<div class="col-4">
		<table data-table="responsive striped">
			<thead>
				<tr>
					<th>Career Average</th>
					<th>Home Runs</th>
					<th>Defensive Runs Saved</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>.{getCareerAverage()}</th>
					<th>{getCareerHomeRuns()}</th>
					<th>{getCareerDRS()}</th>
				</tr>
			</tbody>
		</table>
=======
	<div>
		<Table striped={true}>
			<TableHead>
				<TableHeadCell>Career Average</TableHeadCell>
				<TableHeadCell>Home Runs</TableHeadCell>
				<TableHeadCell>Defensive Runs Saved</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<MyTableBodyCell>.{getCareerAverage()}</MyTableBodyCell>
					<MyTableBodyCell>{getCareerHomeRuns()}</MyTableBodyCell>
					<MyTableBodyCell>{getCareerDRS()}</MyTableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
>>>>>>> Stashed changes
	</div>
</div>

<style>
	@media (max-width: 720px) {
		table {
			display: block;
			width: 100%;
			overflow-x: auto;
		}

		table th,
		table td {
			display: table-cell;
		}

		table thead {
			display: table-header-group;
		}

		table tbody {
			display: table-row-group;
		}
	}
</style>
