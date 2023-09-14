<script>
	export let stats = [],
		retired,
		allStarAppearances,
		mvps,
		worldSeries,
		totalSalary;
</script>

{#if stats.length > 0}
	<div class="row">
		<div class="col-offset-1" data-col="3">
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
							<th>.{stat.average}</th>
							<th>{stat.home_runs}</th>
							<th>{stat.drs}</th>
							<th>{stat.teamName}</th>
						</tr>
					{/if}
				{/each}
			</table>
		</div>
		<div class="col" data-col="3">
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
								<th>.{stat.average}</th>
								<th>{stat.home_runs}</th>
								<th>{stat.drs}</th>
								<th>{stat.teamName}</th>
							</tr>
						{/if}
					{/each}
				{/if}
			</table>
		</div>
		{#if retired}
			<div class="col-offset-1" data-col="4">
				<table data-table="responsive striped">
					<tr>
						<th>All-Stars</th>
						<th>MVPs</th>
						<th>World Series</th>
						<th>Career Earnings</th>
						<th>Hall of Fame</th>
					</tr>
					<tr>
						<th>{allStarAppearances}</th>
						<th>{mvps}</th>
						<th>{worldSeries}</th>
						<th>${totalSalary > 9 ? totalSalary / 10 + 'M' : totalSalary * 100 + 'k'}</th>
						{#if allStarAppearances + mvps * 4 >= 15}
							<th>✓</th>
						{:else}
							<th>✗</th>
						{/if}
					</tr>
				</table>
			</div>
		{/if}
	</div>
{/if}
