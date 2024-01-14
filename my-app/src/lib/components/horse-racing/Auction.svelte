<script>
	import { Heading, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import HorseAuctionRow from '$lib/components/horse-racing/HorseAuctionRow.svelte';
	import { gameHorses, userBalance } from '$lib/stores/horseracing.js';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { usd } from '$lib/utils/universal';
</script>

<div>
	<Heading tag="h3">Auction House</Heading>
</div>

<div>
	Balance: {usd.format($userBalance)}
</div>

<div
	class="w-1/2"
	transition:fly={{ delay: 250, duration: 300, x: 0, y: 500, opacity: 0.5, easing: quintOut }}
>
	<Table hoverable>
		<TableHead>
			<TableHeadCell />
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Color</TableHeadCell>
			<TableHeadCell>Reserve Price</TableHeadCell>
			<TableHeadCell>Info</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $gameHorses as horse}
				<HorseAuctionRow {horse} />
			{/each}
		</TableBody>
	</Table>
</div>
