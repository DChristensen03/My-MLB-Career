<script>
	import {
		Modal,
		Table,
		TableBody,
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

	function enterRace(race) {
		$enteredRace = race;
		enterToastOpen = true;
		setTimeout(() => (enterToastOpen = false), 5000);
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
			{#each races.recurring as race}
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
