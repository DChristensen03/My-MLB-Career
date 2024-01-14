<script>
	import { userHorse, week, userBalance, enteredRace, doRace } from '$lib/stores/horseracing';
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
		TableBodyRow,
		Progressbar
	} from 'flowbite-svelte';
	import { ArrowRightSolid, ClipboardListOutline } from 'flowbite-svelte-icons';
	import Training from './Training.svelte';
	import Races from './Races.svelte';
	import RaceEnv from './RaceEnv.svelte';
	import {
		bay,
		black,
		chestnut,
		darkbay,
		gray,
		white
	} from '$lib/images/Horse Racing Game Assets/PNG/Horse Character';
	import { AngleRightSolid, AngleDownSolid } from 'flowbite-svelte-icons';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let racesOpen = false,
		ppsOpen;

	function advanceWeek() {
		$week++;
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
</script>

<div>
	<Heading tag="h3">Stable</Heading>
</div>

<div>
	Week: {$week}
</div>

{#if !$doRace}
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
				<TableHeadCell>PPs</TableHeadCell>
				<TableHeadCell />
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Speed</TableHeadCell>
				<TableHeadCell>Stamina</TableHeadCell>
				<TableHeadCell>Agility</TableHeadCell>
				<TableHeadCell>Rest</TableHeadCell>
				<TableHeadCell>Enter Races</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>
						{#if !ppsOpen}
							<AngleRightSolid size="sm" on:click={() => (ppsOpen = !ppsOpen)} />
						{:else}
							<AngleDownSolid size="sm" on:click={() => (ppsOpen = !ppsOpen)} />
						{/if}
					</TableBodyCell>
					<TableBodyCell>
						{#if $userHorse.color == 'Bay'}
							<img src={bay} alt="horse-icon" style="max-width: 50px;" />
						{:else if $userHorse.color == 'Dark Bay'}
							<img src={darkbay} alt="horse-icon" style="max-width: 50px;" />
						{:else if $userHorse.color == 'Chestnut'}
							<img src={chestnut} alt="horse-icon" style="max-width: 50px;" />
						{:else if $userHorse.color == 'Black'}
							<img src={black} alt="horse-icon" style="max-width: 50px;" />
						{:else if $userHorse.color == 'Gray'}
							<img src={gray} alt="horse-icon" style="max-width: 50px;" />
						{:else if $userHorse.color == 'White'}
							<img src={white} alt="horse-icon" style="max-width: 50px;" />
						{/if}
					</TableBodyCell>
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
				</TableBodyRow>
			</TableBody>
			{#if ppsOpen}
				<tfoot
					transition:scale={{
						duration: 500,
						delay: 500,
						opacity: 0.5,
						start: 0.5,
						easing: quintOut
					}}
					class="flex"
				>
					<Table divClass="grow">
						<TableHead>
							<TableHeadCell>Name</TableHeadCell>
							<TableHeadCell>Type</TableHeadCell>
							<TableHeadCell>Place</TableHeadCell>
							<TableHeadCell>Winnings</TableHeadCell>
							<TableHeadCell>Date</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each $userHorse.results as result}
								<TableBodyRow>
									<TableBodyCell>
										{result.name}
									</TableBodyCell>
									<TableBodyCell>
										{result.type.toUpperCase()}
									</TableBodyCell>
									<TableBodyCell>
										{result.place}
									</TableBodyCell>
									<TableBodyCell>
										{usd.format(result.winnings)}
									</TableBodyCell>
									<TableBodyCell>
										{result.date}
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</tfoot>
			{/if}
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
{JSON.stringify($userHorse.current)}
