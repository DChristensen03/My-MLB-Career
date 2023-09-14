<script>
	import OffseasonModal from '../components/OffseasonModal.svelte';
	import GameForm from '../components/GameForm.svelte';
	import StatsTable from '../components/StatsTable.svelte';
	import baseball_info from '../info/baseball_info.json';

	let nationality = 'us',
		teamName,
		teamNumber,
		position = 2,
		offers = [],
		lastScore;

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
		},
		lastOverall = {};

	let year = 1,
		isOffseason;

	let stats = [],
		allStarAppearances = 0,
		mvps = 0,
		worldSeries = 0,
		totalSalary = 0,
		retired = false;

	let contractPay = 7,
		contractLength = 1;

	let showStartForm = true;

	$: updateTeam(teamNumber);

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function handleSubmitStart() {
		generatePlayer();

		showStartForm = false;
	}

	function handleAdvanceYear() {
		contractLength--;
		generateYear();
		if (contractLength == 0 && year < 12) simulateFreeAgency();
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
		totalSalary += contractPay;
		let average = Math.round(
				(getRandomInt(overall.contact.current - 10, overall.contact.current) / 100) * 500
			),
			home_runs = getRandomInt(overall.power.current - 30, overall.power.current - 20),
			drs = Math.round(
				((getRandomInt(overall.fielding.current - 10, overall.fielding.current) - 40) / 100) * 20
			);

		if (home_runs < 0) home_runs = 0;

		const score = average * 2 + home_runs * 10 + drs * 20;
		if (score >= 700) allStarAppearances++;
		if (score >= 1000) mvps++;
		lastScore = score;

		const teamScore = score + getRandomInt(20, 60 - baseball_info.teams[teamNumber].rank) * 150;
		if (teamScore > 7000) worldSeries++;

		stats.push({
			year,
			average,
			home_runs,
			drs,
			score,
			teamName
		});

		stats = [...stats];

		updateOverall();
		year++;
	}

	function simulateFreeAgency() {
		offers = [];
		//generate offer one
		offers.push({
			number: getRandomInt(0, baseball_info.teams.length - 1),
			salary: getRandomInt(
				Math.round(7 * (lastScore / 100)) * 2,
				Math.round(7 * (lastScore / 100)) * 2 + 2
			),
			years: getRandomInt(1, 3)
		});
		//generate offer two
		offers.push({
			number: getRandomInt(0, baseball_info.teams.length - 1),
			salary: getRandomInt(
				Math.round(7 * (lastScore / 100)),
				Math.round(7 * (lastScore / 100)) * 2 + 2
			),
			years: getRandomInt(1, 3)
		});
		isOffseason();
	}

	function updateOverall() {
		lastOverall = JSON.parse(JSON.stringify(overall));
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

	function updateTeam(number) {
		if (teamNumber) {
			teamName = baseball_info.teams[number].name;
			teamNumber = number;
		}
	}

	function handleMessage(event) {
		if (event.detail.text == 'advanceYear') {
			handleAdvanceYear();
		} else if (event.detail.text == 'endCareer') {
			endCareer();
		}
	}
</script>

<div style="width: 100%; height: 100%;">
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
							<option value={nation.abbreviation}>{nation.name}</option>
						{/each}
					</select>
				</div>

				<div class="field" data-col="2">
					<label for="positions">Position</label><br />
					<select name="positions" id="positions" bind:value={position}>
						{#each baseball_info.positions as position}
							{#if position.name != 'P'}
								<option value={position.number}>{position.name}</option>
							{/if}
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
		<GameForm
			{teamName}
			{overall}
			{lastOverall}
			{nationality}
			{year}
			{position}
			{retired}
			{contractPay}
			on:message={handleMessage}
		/>
	{/if}

	<br />
	<br />

	<StatsTable {stats} {allStarAppearances} {mvps} {worldSeries} {retired} {totalSalary} />

	<OffseasonModal
		bind:open={isOffseason}
		{offers}
		bind:teamNumber
		bind:salary={contractPay}
		bind:years={contractLength}
		on:message={handleMessage}
	/>
</div>
