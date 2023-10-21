<script>
	import baseball_info from '../../info/baseball_info.json';
	import { createEventDispatcher } from 'svelte';
	import EndOfCareer from './EndOfCareer.svelte';
	import { Input, Button } from 'flowbite-svelte';

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

<div class="flex flex-col items-center gap-1">
	<div>
		Team: {teamName}
	</div>
	<div>
		Overall:
		<span style="color:{avgOverall > lastAvg ? 'green' : avgOverall == lastAvg ? '' : 'red'};">
			{avgOverall}
		</span>
		<span class={`fi fi-${nationality}`} />
	</div>
	<div>
		Position:&nbsp;{baseball_info.positions[position - 1].name}
	</div>
	<div>
		Salary:&nbsp;${contractPay > 9 ? contractPay / 10 + 'M' : contractPay * 100 + 'k'}
	</div>
</div>
<div class="flex flex-col items-center gap-2">
	{#if year < 13}
		<form on:submit|preventDefault={advanceYear}>
			<div>
				<Button type="submit">Play Year {year}</Button>
			</div>
		</form>
	{:else if !retired}
		<form on:submit|preventDefault={endCareer}>
			<div>
				<Button type="submit">Retire</Button>
			</div>
		</form>
	{:else}
		<EndOfCareer {stats} {mvps} {allStarAppearances} {totalSalary} {worldSeries} />
	{/if}
</div>
