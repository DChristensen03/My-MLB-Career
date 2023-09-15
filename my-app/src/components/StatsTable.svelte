<script>
	export let stats = [];
</script>

<div data-grid="row">
	<div class="col-6">
		<table data-table="responsive striped">
			<tr>
				<th />
				<th>AVG</th>
				<th>Home Runs</th>
				<th>DRS</th>
				<th>Team</th>
			</tr>
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
		</table>
	</div>
	<div class="col-6">
		<table data-table="responsive striped">
			{#if stats.length >= 7}
				<tr>
					<th />
					<th>AVG</th>
					<th>Home Runs</th>
					<th>DRS</th>
					<th>Team</th>
				</tr>
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
			{/if}
		</table>
	</div>
</div>
