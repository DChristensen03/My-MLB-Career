<script>
	import baseball_info from '../../info/baseball_info.json';
	import { createEventDispatcher } from 'svelte';
	import EndOfCareer from './EndOfCareer.svelte';

	const dispatch = createEventDispatcher();

	export let teamName,
		overall,
		lastOverall,
		nationality,
		year,
		position,
		retired,
		contractPay,
		mvps,
		allStarAppearances,
		worldSeries,
		totalSalary,
		stats;

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
</script>

<div data-grid="row">
	<div class="col-12">
		Team: {teamName}
	</div>
</div>
<div data-grid="row">
	<div class="col-12">
		Overall:
		<span style="color:{avgOverall > lastAvg ? 'green' : avgOverall == lastAvg ? '' : 'red'};">
			{avgOverall}
		</span>
		<span class={`fi fi-${nationality}`} />
	</div>
</div>
<div data-grid="row">
	<div class="col-12">
		Position:&nbsp;{baseball_info.positions[position - 1].name}
	</div>
</div>
<div data-grid="row">
	<div class="col-12">
		Salary:&nbsp;${contractPay > 9 ? contractPay / 10 + 'M' : contractPay * 100 + 'k'}
	</div>
</div>

{#if year < 13}
	<form on:submit|preventDefault={advanceYear}>
		<div data-grid="row">
			<div class="col-12">
				<input class="cta-button" type="submit" value="Play Year {year}" />
			</div>
		</div>
	</form>
{:else if !retired}
	<form on:submit|preventDefault={endCareer}>
		<div data-grid="row">
			<div class="col-12">
				<input class="cta-button" type="submit" value="Retire" />
			</div>
		</div>
	</form>
{:else}
	<EndOfCareer {stats} {mvps} {allStarAppearances} {totalSalary} {worldSeries} />
{/if}

<style>
	.cta-button {
		display: inline-block;
		background-color: #ff5722;
		color: #fff;
		text-align: center;
		padding: 10px 20px;
		margin-top: 10px;
		text-decoration: none;
		border-radius: 5px;
		font-size: 16px;
		transition: background-color 0.3s;
	}

	.cta-button:hover {
		background-color: #e64a19;
	}
</style>
