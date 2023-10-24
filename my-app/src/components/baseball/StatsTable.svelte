<script>
	import { Table, TableBody, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import MyTableBodyCell from '$lib/MyTableBodyCell.svelte';

	export let stats = [];
</script>

<Table shadow striped={true}>
	<TableHead>
		<TableHeadCell />
		<TableHeadCell>AVG</TableHeadCell>
		<TableHeadCell>Home Runs</TableHeadCell>
		<TableHeadCell>DRS</TableHeadCell>
		<TableHeadCell>Team</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each stats as stat, i}
			{#if i < 6}
				<TableBodyRow>
					<MyTableBodyCell>{stat.year}</MyTableBodyCell>
					<MyTableBodyCell>.{stat.average > 99 ? stat.average : '0' + stat.average}</MyTableBodyCell
					>
					<MyTableBodyCell>{stat.home_runs}</MyTableBodyCell>
					<MyTableBodyCell>{stat.drs}</MyTableBodyCell>
					<MyTableBodyCell>{stat.teamName}</MyTableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>

{#if stats.length >= 7}
	<Table shadow striped={true}>
		<TableHead>
			<TableHeadCell />
			<TableHeadCell>AVG</TableHeadCell>
			<TableHeadCell>Home Runs</TableHeadCell>
			<TableHeadCell>DRS</TableHeadCell>
			<TableHeadCell>Team</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each stats as stat, i}
				{#if i >= 6}
					<TableBodyRow>
						<MyTableBodyCell>{stat.year}</MyTableBodyCell>
						<MyTableBodyCell
							>.{stat.average > 99 ? stat.average : '0' + stat.average}</MyTableBodyCell
						>
						<MyTableBodyCell>{stat.home_runs}</MyTableBodyCell>
						<MyTableBodyCell>{stat.drs}</MyTableBodyCell>
						<MyTableBodyCell>{stat.teamName}</MyTableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
{/if}
