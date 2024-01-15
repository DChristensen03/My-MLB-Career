<script>
	import { userHorse, week, year, userBalance, enteredRace, doRace } from '$lib/stores/horseracing';
	import getRandomInt from '$lib/utils/getRandomInt';
	import { usd } from '$lib/utils/universal';
	import { Heading, Button, Table, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { ArrowRightSolid, ClipboardListOutline } from 'flowbite-svelte-icons';
	import Training from './Training.svelte';
	import Races from './Races.svelte';
	import RaceEnv from './RaceEnv.svelte';
	import HorseInfoRow from './HorseInfoRow.svelte';
	import PpView from './PPView.svelte';
	import YearChangeModal from './YearChangeModal.svelte';
	import StakesSchedule from './StakesSchedule.svelte';

	let racesOpen = false,
		ppsOpen,
		yearChangeOpen = false,
		stakesScheduleOpen = false;

	function advanceWeek() {
		if ($week < 52) $week++;
		else {
			yearChange();
		}
		const restAmount = getRandomInt(15, 30);
		if ($userHorse.rest + restAmount > 100) {
			$userHorse.rest = 100;
		} else {
			$userHorse.rest += restAmount;
		}

		if ($userHorse.tuning - $userHorse.tuningLoss < 0) {
			$userHorse.tuning = 0;
		} else {
			$userHorse.tuning -= $userHorse.tuningLoss;
		}
		if (Object.keys($enteredRace).length > 0) $doRace = true;
	}

	function yearChange() {
		$week = 1;
		$year++;
		$userHorse.age++;
		yearChangeOpen = true;
	}
</script>

<div>
	<Heading tag="h3">Stable</Heading>
</div>

<div>
	Year: {$year} Week: {$week}
</div>

{#if !$doRace}
	<div class="grid grid-cols-2 gap-2">
		<div>
			<Button on:click={advanceWeek}>
				Advance Week &nbsp;
				<ArrowRightSolid size="sm" class="w-3 h-3" />
			</Button>
		</div>
		<div>
			<Button on:click={() => (stakesScheduleOpen = true)}>
				Stakes Schedule &nbsp;
				<ClipboardListOutline size="sm" class="w-3 h-3" />
			</Button>
		</div>
		<StakesSchedule bind:open={stakesScheduleOpen} />
	</div>

	<br />

	<div>
		Balance: {usd.format($userBalance)}
	</div>

	<br />

	<div class="sm:w-full md:w-full lg:w-2/3">
		<Table class="table-fixed">
			<TableHead>
				<TableHeadCell class="text-wrap">PPs</TableHeadCell>
				<TableHeadCell />
				<TableHeadCell class="text-wrap">Name</TableHeadCell>
				<TableHeadCell class="text-wrap">Age</TableHeadCell>
				<TableHeadCell class="text-wrap">Earnings</TableHeadCell>
				<TableHeadCell class="text-wrap">Speed</TableHeadCell>
				<TableHeadCell class="text-wrap">Stamina</TableHeadCell>
				<TableHeadCell class="text-wrap">Agility</TableHeadCell>
				<TableHeadCell class="text-wrap">Rest</TableHeadCell>
				<TableHeadCell class="text-wrap">Enter Races</TableHeadCell>
			</TableHead>
			<HorseInfoRow bind:ppsOpen bind:racesOpen />
			<PpView bind:ppsOpen />
		</Table>
	</div>

	<Training />

	<Races bind:open={racesOpen} />
{:else}
	<div>
		<Heading tag="h4">{$enteredRace.name}</Heading>
	</div>
	<RaceEnv />
{/if}

<YearChangeModal bind:open={yearChangeOpen} />
