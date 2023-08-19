<script>
	import OffseasonModal from '../components/OffseasonModal.svelte';
	import baseball_info from '../info/baseball_info.json';

	let nationality = 'United States',
		teamName,
		teamNumber,
		position = 1,
		offers = [];

	let overall = {
		contact: {
			current: 0,
			potential: 0
		},
		power: {
			current: 0,
			potential: 0
		},
		fielding: {
			current: 0,
			potential: 0
		},
		development: 0
	};

	let year = 1,
		isOffseason = false;

	let stats = [],
		allStarAppearances = 0,
		mvps = 0,
		worldSeries = 0,
		retired = false;

	let showStartForm = true;

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function handleSubmitStart() {
		generatePlayer();

		showStartForm = false;
	}

	function handleAdvanceYear() {
		simulateFreeAgency();
		generateYear();

		year++;
	}

	function generatePlayer() {
		overall.contact.potential = getRandomInt(30, 100);
		overall.power.potential = getRandomInt(30, 100);
		overall.fielding.potential = getRandomInt(30, 100);

		overall.contact.current = getRandomInt(15, overall.contact.potential);
		overall.power.current = getRandomInt(5, overall.power.potential);
		overall.fielding.current = getRandomInt(20, overall.fielding.potential);

		overall.development = getRandomInt(1, 10);

		teamNumber = getRandomInt(0, baseball_info.teams.length - 1);
		teamName = baseball_info.teams[teamNumber].name;
	}

	function generateYear() {
		const average = Math.round(
				(getRandomInt(overall.contact.current - 10, overall.contact.current) / 100) * 500
			),
			home_runs = Math.round(
				overall.power.current * 0.8 +
					getRandomInt(overall.power.current * 0.8 - 5, overall.power.current * 0.8 + 5)
			),
			drs = Math.round(
				((getRandomInt(overall.fielding.current - 10, overall.fielding.current) - 40) / 100) * 20
			);

		const score = average * 2 + home_runs * 10 + drs * 50;
		if (score >= 1250) allStarAppearances++;
		if (score >= 1750) mvps++;

		const teamScore = score + getRandomInt(20, 60 - baseball_info.teams[teamNumber].overall) * 150;
		if (teamScore > 3000) worldSeries++;

		stats.push({
			year,
			average,
			home_runs,
			drs,
			score
		});

		stats = [...stats];

		updateOverall();
	}

	function simulateFreeAgency() {
		offers = [];
		//generate offer one
		offers.push({
			team: baseball_info.teams[getRandomInt(0, baseball_info.teams.length)].name,
			salary: getRandomInt(7, 30),
			years: getRandomInt(1, 3)
		});
		//generate offer two
		offers.push({
			team: baseball_info.teams[getRandomInt(0, baseball_info.teams.length)].name,
			salary: getRandomInt(7, 30),
			years: getRandomInt(1, 3)
		});
		isOffseason = true;
	}

	function updateOverall() {
		overall.contact.current = checkOverallUpdate(
			overall.contact.current,
			overall.contact.potential
		);
		overall.power.current = checkOverallUpdate(overall.power.current, overall.power.potential);
		overall.fielding.current = checkOverallUpdate(
			overall.fielding.current,
			overall.fielding.potential
		);
	}

	function checkOverallUpdate(current, potential) {
		// the amount that could be added
		let addition = overall.development - (5 - baseball_info.teams[teamNumber].development);

		if (current >= potential) return current;

		if (potential - current >= addition) return getRandomInt(current, current + addition);
		else return getRandomInt(current, potential);
	}

	function endCareer() {
		retired = true;
	}

	function reset() {
		window.location.reload();
	}
</script>

<div class-grid="row">
	<div class="col-offset-1">
		<h1>Welcome to My MLB Career</h1>
	</div>
</div>

{#if showStartForm}
	<form on:submit|preventDefault={handleSubmitStart}>
		<div class="row">
			<div class="field col-offset-2" data-col="2">
				<label for="nationalities">Nation</label>
				<select name="nationalities" id="nationalities" bind:value={nationality}>
					{#each baseball_info.nationalities as nation}
						<option value={nation.name}>{nation.name}</option>
					{/each}
				</select>
			</div>

			<div class="field" data-col="2">
				<label for="positions">Position</label><br />
				<select name="positions" id="positions" bind:value={position}>
					{#each baseball_info.positions as position}
						<option value={position.number}>{position.name}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="row">
			<div class="field col-offset-2" data-col="2">
				<input type="submit" />
			</div>
		</div>
	</form>
{/if}

{#if !showStartForm}
	<div class="row">
		<div class="col-offset-2">
			Team: {teamName} <br />
			Overall: {Math.round(
				(overall.contact.current + overall.power.current + overall.fielding.current) / 3
			)}
			{Math.round(overall.contact.current)}
			{Math.round(overall.power.current)}
			{Math.round(overall.fielding.current)}<br />
			Position: {baseball_info.positions[position - 1].name} <br />

			{#if year !== 13}
				<form on:submit|preventDefault={handleAdvanceYear}>
					<div class="row">
						<div class="field" data-col="2">
							<input type="submit" value="Play Year {year}" />
						</div>
					</div>
				</form>
			{:else if !retired}
				<form on:submit|preventDefault={endCareer}>
					<div class="row">
						<div class="field" data-col="2">
							<input type="submit" value="Retire" />
						</div>
					</div>
				</form>
			{:else}
				<form on:submit|preventDefault={reset}>
					<div class="row">
						<div class="field" data-col="2">
							<input type="submit" value="Reset" />
						</div>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}

<br />
<br />

{#if stats.length > 0}
	<div class="row">
		<div class="col-offset-2" data-col="4">
			<table data-table="responsive striped">
				<tr>
					<th />
					<th>AVG</th>
					<th>Home Runs</th>
					<th>DRS</th>
				</tr>
				{#each stats as stat}
					<tr>
						<th>{stat.year}</th>
						<th>.{stat.average}</th>
						<th>{stat.home_runs}</th>
						<th>{stat.drs}</th>
					</tr>
				{/each}
			</table>
		</div>
		{#if retired}
			<div class="col-offset-1" data-col="4">
				<table data-table="responsive striped">
					<tr>
						<th>All-Stars</th>
						<th>MVPs</th>
						<th>World Series</th>
						<th>Hall of Fame</th>
					</tr>
					<tr>
						<th>{allStarAppearances}</th>
						<th>{mvps}</th>
						<th>{worldSeries}</th>
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

<OffseasonModal isOpen={isOffseason} {offers} />
