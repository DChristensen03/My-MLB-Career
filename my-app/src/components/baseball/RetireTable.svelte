<script>
	import {
		Heading,
		Table,
		TableBody,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import MyTableBodyCell from '$lib/MyTableBodyCell.svelte';

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

<div class="flex flex-col items-center">
	<div>
		<Heading tag="h2">🏆Trophy Case🏆</Heading>
	</div>
</div>
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
					{/if}
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
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
	</div>
</div>
