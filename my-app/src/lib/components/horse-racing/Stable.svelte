<script>
	import { userHorse, week, userBalance, enteredRace } from '$lib/stores/horseracing';
	import getRandomInt from '$lib/utils/getRandomInt';
	import { usd } from '$lib/utils/universal';
	import {
		Heading,
		Button,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		Progressbar
	} from 'flowbite-svelte';
	import { ArrowRightSolid, ClipboardListOutline } from 'flowbite-svelte-icons';
	import Training from './Training.svelte';
	import Races from './Races.svelte';
	import RaceEnv from './RaceEnv.svelte';

	let racesOpen = false,
		doRace = false;

	function advanceWeek() {
		$week++;
		const restAmount = getRandomInt(15, 30);
		if ($userHorse.rest + restAmount > 100) {
			$userHorse.rest = 100;
		} else {
			$userHorse.rest += restAmount;
		}
		if (Object.keys($enteredRace).length > 0) doRace = true;
	}
</script>

<div>
	<Heading tag="h3">Stable</Heading>
</div>

<div>
	Week: {$week}
</div>

{#if !doRace}
	<div>
		<Button on:click={advanceWeek}>
			Advance Week &nbsp;
			<ArrowRightSolid size="sm" class="w-3 h-3" />
		</Button>
	</div>

	<br />

	<div>
		Balance: {usd.format($userBalance)}
	</div>

	<br />

	<div class="w-2/3">
		<Table class="table-fixed">
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Speed</TableHeadCell>
				<TableHeadCell>Stamina</TableHeadCell>
				<TableHeadCell>Agility</TableHeadCell>
				<TableHeadCell>Rest</TableHeadCell>
				<TableHeadCell>Enter Races</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyCell>
					{$userHorse.name}
				</TableBodyCell>
				<TableBodyCell>
					<Progressbar progress={($userHorse.current.speed / $userHorse.potential.speed) * 100} />
				</TableBodyCell>
				<TableBodyCell>
					<Progressbar
						progress={($userHorse.current.stamina / $userHorse.potential.stamina) * 100}
					/>
				</TableBodyCell>
				<TableBodyCell>
					<Progressbar
						progress={($userHorse.current.agility / $userHorse.potential.agility) * 100}
					/>
				</TableBodyCell>
				<TableBodyCell>
					<Progressbar progress={$userHorse.rest} />
				</TableBodyCell>
				<TableBodyCell>
					<Button on:click={() => (racesOpen = true)} size="xs"
						>Races&nbsp;<ClipboardListOutline size="sm" /></Button
					>
				</TableBodyCell>
			</TableBody>
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
