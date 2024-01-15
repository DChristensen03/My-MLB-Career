<script>
	import {
		Modal,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		Label,
		Select
	} from 'flowbite-svelte';
	import TableBodyCell from '$lib/MyTableBodyCell.svelte';
	import races from '$lib/data/horse-races.json';
	import { usd } from '$lib/utils/universal';
	import FormatDistance from '$lib/utils/horse-racing/FormatDistance';

	export let open = false;

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

	let stakesRaces = [];

	function filterRaces() {
		stakesRaces = [];

		for (let i = 0; i < 52; i++) {
			if (races[i.toString()]) {
				for (let race of races[i.toString()]) {
					race.week = i;
					if (
						(type === 'all' || race.type === type) &&
						(age === 'all' || race.age === age) &&
						(distance === 'all' ||
							(distance === 'sprint' && race.distance < 8) ||
							(distance === 'mile' && race.distance == 8) ||
							(distance === 'route' && race.distance > 8))
					)
						if (race.type === 'mdn' && numWins == 0) {
							stakesRaces.push(race);
						} else if (race.type !== 'mdn') {
							stakesRaces.push(race);
						}
				}
			}
		}
	}

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
	<Table divClass="flex flex-row">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Week</TableHeadCell>
			<TableHeadCell>Type</TableHeadCell>
			<TableHeadCell>Age</TableHeadCell>
			<TableHeadCell>Distance</TableHeadCell>
			<TableHeadCell>Purse</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each stakesRaces as race}
				<TableBodyRow>
					<TableBodyCell>
						{race.name}
					</TableBodyCell>
					<TableBodyCell>
						{race.week}
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
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</Modal>
