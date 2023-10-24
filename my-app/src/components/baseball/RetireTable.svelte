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
	import StatsTable from './StatsTable.svelte';

	export let stats, allStarAppearances, mvps, worldSeries, totalSalary;

	function getCareerAverage() {
		let total = 0;
		for (let stat of stats) {
			total += stat.average;
		}
		const average = Math.round(total / 12);
		return average > 99 ? average : `0${average}`;
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
<div class="grid md:grid-cols-1 lg:grid-cols-2 sm:align-items-center px-8">
	<div class="hidden md:block">
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
					<MyTableBodyCell>{allStarAppearances + mvps * 4 >= 15 ? '✓' : '✗'}</MyTableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
	<div class="block md:hidden">
		<Table striped={true}>
			<TableHead>
				<TableHeadCell>All-Stars</TableHeadCell>
				<TableHeadCell>MVPs</TableHeadCell>
				<TableHeadCell>World Series</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<MyTableBodyCell>{allStarAppearances}</MyTableBodyCell>
					<MyTableBodyCell>{mvps}</MyTableBodyCell>
					<MyTableBodyCell>{worldSeries}</MyTableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
	<div class="block md:hidden">
		<Table striped={true}>
			<TableHead>
				<TableHeadCell>Career Earnings</TableHeadCell>
				<TableHeadCell>Hall of Fame</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<MyTableBodyCell
						>${totalSalary > 9 ? totalSalary / 10 + 'M' : totalSalary * 100 + 'k'}</MyTableBodyCell
					>
					<MyTableBodyCell>{allStarAppearances + mvps * 4 >= 15 ? '✓' : '✗'}</MyTableBodyCell>
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
