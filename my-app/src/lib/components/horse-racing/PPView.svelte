<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { userHorse } from '$lib/stores/horseracing';
	import { usd } from '$lib/utils/universal';
	import FormatDistance from '$lib/utils/horse-racing/FormatDistance';

	export let ppsOpen = false;
</script>

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
				<TableHeadCell>Distance</TableHeadCell>
				<TableHeadCell>Purse</TableHeadCell>
				<TableHeadCell>Winnings</TableHeadCell>
				<TableHeadCell>Place</TableHeadCell>
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
							{FormatDistance(result.distance)}
						</TableBodyCell>
						<TableBodyCell>
							{usd.format(result.purse)}
						</TableBodyCell>
						<TableBodyCell>
							{usd.format(result.winnings)}
						</TableBodyCell>
						<TableBodyCell>
							{result.place}
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
