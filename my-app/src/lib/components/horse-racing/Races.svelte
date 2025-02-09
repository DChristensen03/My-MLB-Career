<script>
	import {
		Modal,
		Table,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		TableHead,
		TableHeadCell,
		Button,
		Toast,
		Label,
		Select
	} from 'flowbite-svelte';
	import { CheckCircleOutline, CheckCircleSolid } from 'flowbite-svelte-icons';
	import races from '$lib/data/horse-races.json';
	import { usd } from '$lib/utils/universal';
	import { enteredRace, week } from '$lib/stores/horseracing';
	import { fly } from 'svelte/transition';
	import { userHorse } from '$lib/stores/horseracing';
	import FormatDistance from '$lib/utils/horse-racing/FormatDistance';

	let eligibleRaces = [];

	let type = 'all',
		age = 'all',
		distance = 'all';

	let raceTypes = [
		{ value: 'all', name: 'All' },
		{ value: 'g1', name: 'Grade 1' },
		{ value: 'g2', name: 'Grade 2' },
		{ value: 'g3', name: 'Grade 3' },
		{ value: 'l', name: 'Listed' },
		{ value: 'alw', name: 'Allowance' },
		{ value: 'mdn', name: 'Maiden' }
	];

	let raceAges = [
		{ value: 'all', name: 'All' },
		{ value: '2', name: '2' },
		{ value: '3', name: '3' },
		{ value: '3+', name: '3+' },
		{ value: '4+', name: '4+' }
	];

	let raceDistances = [
		{ value: 'all', name: 'All' },
		{ value: 'sprint', name: 'Sprint' },
		{ value: 'mile', name: 'Mile' },
		{ value: 'route', name: 'Route' }
	];

	function enterRace(race) {
		$enteredRace = race;
		enterToastOpen = true;
		setTimeout(() => (enterToastOpen = false), 5000);
	}

	function filterRaces() {
		let numWins = 0;
		eligibleRaces = [];
		for (let result of $userHorse.results) {
			if (result.place == 1) {
				numWins++;
			}
		}

		for (let race of races.recurring) {
			const raceAge = parseInt(race.age.substring(0, 1));
			if ((race.age.includes('+') && $userHorse.age >= raceAge) || $userHorse.age === raceAge) {
				if (
					(type === 'all' || race.type === type) &&
					(age === 'all' || race.age === age) &&
					(distance === 'all' ||
						(distance === 'sprint' && race.distance < 8) ||
						(distance === 'mile' && race.distance == 8) ||
						(distance === 'route' && race.distance > 8))
				)
					if (race.type === 'mdn' && numWins == 0) {
						eligibleRaces.push(race);
					} else if (race.type !== 'mdn') {
						eligibleRaces.push(race);
					}
			}
		}
		if (races[($week + 1).toString()]) {
			for (let race of races[($week + 1).toString()]) {
				const raceAge = parseInt(race.age.substring(0, 1));
				if ((race.age.includes('+') && $userHorse.age >= raceAge) || $userHorse.age === raceAge) {
					if (
						(type === 'all' || race.type === type) &&
						(age === 'all' || race.age === age) &&
						(distance === 'all' ||
							(distance === 'sprint' && race.distance < 8) ||
							(distance === 'mile' && race.distance == 8) ||
							(distance === 'route' && race.distance > 8))
					)
						if (race.type === 'mdn' && numWins == 0) {
							eligibleRaces.push(race);
						} else if (race.type !== 'mdn') {
							eligibleRaces.push(race);
						}
				}
			}
		}
	}

	export let open;

	let enterToastOpen = false;

	$: type, age, distance, open, filterRaces();
</script>

<Modal bind:open size="lg">
	<div class="grid grid-cols-3 gap-2">
		<div>
			<Label for="type">Race Type</Label>
			<Select id="type" size="sm" items={raceTypes} bind:value={type} />
		</div>
		<div>
			<Label for="age">Race Age</Label>
			<Select id="age" items={raceAges} bind:value={age} />
		</div>
		<div>
			<Label for="distance">Race Distance</Label>
			<Select id="distance" items={raceDistances} bind:value={distance} />
		</div>
	</div>
	<Table divClass="flex flex-row3">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Type</TableHeadCell>
			<TableHeadCell>Age</TableHeadCell>
			<TableHeadCell>Distance</TableHeadCell>
			<TableHeadCell>Purse</TableHeadCell>
			<TableHeadCell>Enter</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each eligibleRaces as race}
				<TableBodyRow>
					<TableBodyCell>
						{race.name}
					</TableBodyCell>
					<TableBodyCell>
						{race.type.toUpperCase()}
					</TableBodyCell>
					<TableBodyCell>
						{race.age}
					</TableBodyCell>
					<TableBodyCell>
						{FormatDistance(race.distance)}
					</TableBodyCell>
					<TableBodyCell>
						{usd.format(race.purse)}
					</TableBodyCell>
					<TableBodyCell>
						<Button
							on:click={() => {
								enterRace(race);
								open = false;
							}}
							size="sm"
						>
							<CheckCircleOutline size="sm" />
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Modal>

<Toast
	transition={fly}
	params={{ x: -250, y: 600 }}
	position="top-right"
	color="green"
	dismissable={false}
	bind:open={enterToastOpen}
>
	<svelte:fragment slot="icon">
		<CheckCircleSolid class="w-5 h-5" />
		<span class="sr-only">Check icon</span>
	</svelte:fragment>
	Race entered successfully.
</Toast>
