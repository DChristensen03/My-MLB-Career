<script>
	export let stats = [];
</script>

<div class="col-6">
	<table data-table="responsive striped">
		<thead>
			<tr>
				<th />
				<th>AVG</th>
				<th>Home Runs</th>
				<th>DRS</th>
				<th>Team</th>
			</tr>
		</thead>
		<tbody>
			{#each stats as stat, i}
				{#if i < 6}
					<tr>
						<th>{stat.year}</th>
						<th>.{stat.average > 99 ? stat.average : '0' + stat.average}</th>
						<th>{stat.home_runs}</th>
						<th>{stat.drs}</th>
						<th>{stat.teamName}</th>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
<div class="col-6">
	<table data-table="striped responsive">
		{#if stats.length >= 7}
			<thead>
				<tr>
					<th />
					<th>AVG</th>
					<th>Home Runs</th>
					<th>DRS</th>
					<th>Team</th>
				</tr>
			</thead>
			<tbody>
				{#each stats as stat, i}
					{#if i >= 6}
						<tr>
							<th>{stat.year}</th>
							<th>.{stat.average > 99 ? stat.average : '0' + stat.average}</th>
							<th>{stat.home_runs}</th>
							<th>{stat.drs}</th>
							<th>{stat.teamName}</th>
						</tr>
					{/if}
				{/each}
			</tbody>
		{/if}
	</table>
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
