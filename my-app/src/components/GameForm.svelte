<script>
	import baseball_info from '../info/baseball_info.json';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let teamName, overall, lastOverall, nationality, year, position, retired, contractPay;

	let avgOverall, lastAvg;

	$: overall, lastOverall, calculateOverall();

	function calculateOverall() {
		avgOverall = Math.round(
			(overall.contact.current + overall.power.current + overall.fielding.current) / 3
		);
		lastAvg = avgOverall;

		if (JSON.stringify(lastOverall) !== '{}') {
			lastAvg = Math.round(
				(lastOverall.contact.current + lastOverall.power.current + lastOverall.fielding.current) / 3
			);
		}
	}

	function advanceYear() {
		dispatch('message', {
			text: 'advanceYear'
		});
	}

	function endCareer() {
		dispatch('message', {
			text: 'endCareer'
		});
	}

	function reset() {
		window.location.reload();
	}
</script>

<div class="row">
	<div class="col-offset-2">
		Team: {teamName} <br />
		Overall:
		<span style="color:{avgOverall > lastAvg ? 'green' : avgOverall == lastAvg ? '' : 'red'};">
			{avgOverall}
		</span>
		{Math.round(overall.contact.current)}
		{Math.round(overall.power.current)}
		{Math.round(overall.fielding.current)}
		<span class={`fi fi-${nationality}`} /><br />
		Position: {baseball_info.positions[position - 1].name} <br />
		Salary: ${contractPay > 9 ? contractPay / 10 + 'M' : contractPay * 100 + 'k'}

		{#if year < 13}
			<form on:submit|preventDefault={advanceYear}>
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
