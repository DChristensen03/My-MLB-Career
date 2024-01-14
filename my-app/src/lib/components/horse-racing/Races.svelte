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
		Toast
	} from 'flowbite-svelte';
	import { CheckCircleOutline, CheckCircleSolid } from 'flowbite-svelte-icons';
	import races from '$lib/data/horse-races.json';
	import { usd } from '$lib/utils/universal';
	import { enteredRace } from '$lib/stores/horseracing';
	import { fly } from 'svelte/transition';
	import { userHorse } from '$lib/stores/horseracing';

	function enterRace(race) {
		$enteredRace = race;
		enterToastOpen = true;
		setTimeout(() => (enterToastOpen = false), 5000);
	}

	function filterRaces() {
		let numWins = 0;
		let eligibleRaces = [];
		for (let result of $userHorse.results) {
			if (result.place == 1) {
				numWins++;
			}
		}

		for (let race of races.recurring) {
			const raceAge = parseInt(race.age.substring(0, 1));
			if ((race.age.includes('+') && $userHorse.age >= raceAge) || $userHorse.age === raceAge) {
				if (race.type === 'mdn' && numWins == 0) {
					eligibleRaces.push(race);
				} else if (race.type !== 'mdn') {
					eligibleRaces.push(race);
				}
			}
		}
		return eligibleRaces;
	}

	export let open;

	let enterToastOpen = false;
</script>

<Modal bind:open size="lg">
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
			{#each filterRaces() as race}
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
						{race.distance < 8
							? `${race.distance}f`
							: race.distance === 8
							? '1 mile'
							: `${race.distance / 8} miles`}
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
