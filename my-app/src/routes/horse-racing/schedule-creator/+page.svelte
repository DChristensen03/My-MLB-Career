<script>
	import { Label, Select, Input, Button } from 'flowbite-svelte';

	let races = [];

	let type = 'l',
		name = '',
		age = '2',
		distance = 5,
		purse = 10000,
		level = 6;

	let raceTypes = [
		{ value: 'g1', name: 'Grade 1' },
		{ value: 'g2', name: 'Grade 2' },
		{ value: 'g3', name: 'Grade 3' },
		{ value: 'l', name: 'Listed' }
	];

	let raceAges = [
		{ value: '2', name: '2' },
		{ value: '3', name: '3' },
		{ value: '3+', name: '3+' },
		{ value: '4+', name: '4+' }
	];

	let raceLevels = [
		{ value: 1, name: '1' },
		{ value: 2, name: '2' },
		{ value: 3, name: '3' },
		{ value: 4, name: '4' },
		{ value: 5, name: '5' },
		{ value: 6, name: '6' },
		{ value: 7, name: '7' },
		{ value: 8, name: '8' },
		{ value: 9, name: '9' },
		{ value: 10, name: '10' }
	];

	function saveRace() {
		races.push({
			name,
			type,
			age,
			distance,
			purse,
			level
		});
		races = [...races];

		(type = 'l'), (name = ''), (age = '2'), (distance = 5), (purse = 10000), (level = 6);
	}
</script>

<div class="grid grid-cols-3 items-center gap-4 px-8 py-4">
	<div>
		<Label for="type">Race Type</Label>
		<Select id="type" items={raceTypes} bind:value={type} />
	</div>
	<div>
		<Label for="name">Race Name</Label>
		<Input id="type" bind:value={name} />
	</div>
	<div>
		<Label for="age">Race Age</Label>
		<Select id="age" items={raceAges} bind:value={age} />
	</div>
	<div>
		<Label for="distance">Race Distance</Label>
		<Input id="distance" bind:value={distance} type="number" />
	</div>
	<div>
		<Label for="purse">Purse</Label>
		<Input id="purse" bind:value={purse} type="number" />
	</div>
	<div>
		<Label for="level">Level</Label>
		<Select id="level" items={raceLevels} bind:value={level} />
	</div>
	<div>
		<Button on:click={saveRace}>Save Race</Button>
	</div>
</div>

<div>
	{JSON.stringify(races)}
</div>
