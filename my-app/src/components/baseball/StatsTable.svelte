<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let stats = [];
</script>

<Table striped={true}>
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
					<TableBodyCell>{stat.year}</TableBodyCell>
					<TableBodyCell>.{stat.average > 99 ? stat.average : '0' + stat.average}</TableBodyCell>
					<TableBodyCell>{stat.home_runs}</TableBodyCell>
					<TableBodyCell>{stat.drs}</TableBodyCell>
					<TableBodyCell>{stat.teamName}</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>

<Table striped={true}>
	{#if stats.length >= 7}
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
						<TableBodyCell>{stat.year}</TableBodyCell>
						<TableBodyCell>.{stat.average > 99 ? stat.average : '0' + stat.average}</TableBodyCell>
						<TableBodyCell>{stat.home_runs}</TableBodyCell>
						<TableBodyCell>{stat.drs}</TableBodyCell>
						<TableBodyCell>{stat.teamName}</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	{/if}
</Table>
