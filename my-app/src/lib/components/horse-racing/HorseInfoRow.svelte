<script>
	import {
		bay,
		black,
		chestnut,
		darkbay,
		gray,
		white
	} from '$lib/images/Horse Racing Game Assets/PNG/Horse Character';
	import { TableBody, TableBodyRow, Progressbar, Button } from 'flowbite-svelte';
	import TableBodyCell from '$lib/MyTableBodyCell.svelte';
	import { AngleRightSolid, AngleDownSolid, ClipboardListOutline } from 'flowbite-svelte-icons';
	import { userHorse } from '$lib/stores/horseracing';
	import { usd } from '$lib/utils/universal';

	export let ppsOpen = false,
		racesOpen = false;
</script>

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
			{$userHorse.age}
		</TableBodyCell>
		<TableBodyCell>
			{usd.format(
				$userHorse.results.reduce(function (sum, a) {
					return sum + a.winnings;
				}, 0)
			)}
		</TableBodyCell>
		<TableBodyCell>
			{#if $userHorse.current.speed == $userHorse.potential.speed}
				MAX
			{/if}
			<Progressbar progress={($userHorse.current.speed / $userHorse.potential.speed) * 100} />
		</TableBodyCell>
		<TableBodyCell>
			{#if $userHorse.current.stamina == $userHorse.potential.stamina}
				MAX
			{/if}
			<Progressbar progress={($userHorse.current.stamina / $userHorse.potential.stamina) * 100} />
		</TableBodyCell>
		<TableBodyCell>
			{#if $userHorse.current.agility == $userHorse.potential.agility}
				MAX
			{/if}
			<Progressbar progress={($userHorse.current.agility / $userHorse.potential.agility) * 100} />
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
