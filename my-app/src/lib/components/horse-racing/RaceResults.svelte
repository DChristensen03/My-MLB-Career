<script>
	import { userHorse, raceResult, enteredRace, doRace } from '$lib/stores/horseracing';
	import GenerateResult from '$lib/utils/horse-racing/GenerateResult';
	import { usd } from '$lib/utils/universal';
	import {
		Card,
		Heading,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		CloseButton
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';

	export let open = false;

	onMount(() => {
		open = true;
	});

	$: if ($doRace) GenerateResult();

	function exitPage() {
		$enteredRace = {};
		if ($userHorse.rest - $userHorse.restLoss > 0) $userHorse.rest -= $userHorse.restLoss;
		else $userHorse.rest = 0;
		$userHorse.tuning = 100;
		open = false;
		$doRace = false;
	}

	function fmtMSS(seconds) {
		let minutes = Math.floor(seconds / 60);
		let extraSeconds = (seconds % 60).toFixed(2);
		extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;
		return `${minutes}:${extraSeconds}`;
	}
</script>

{#if open}
	<div
		class="absolute"
		transition:scale={{
			duration: 500,
			delay: 500,
			opacity: 0.5,
			start: 0.5,
			easing: quintIn
		}}
	>
		<Card size="xl">
			<Heading tag="h5" class="flex items-center">{$enteredRace.name}</Heading>
			<CloseButton on:click={() => exitPage()} />
			<Table>
				<TableHead>
					<TableHeadCell />
					<!-- Finish position -->
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Trainer</TableHeadCell>
					<TableHeadCell>Time</TableHeadCell>
					<TableHeadCell>Amount $</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each $raceResult as result, i}
						<TableBodyRow>
							<TableBodyCell>
								{i + 1}
							</TableBodyCell>
							<TableBodyCell>
								{result.name}
							</TableBodyCell>
							<TableBodyCell>
								{result.owner}
							</TableBodyCell>
							<TableBodyCell>
								{fmtMSS(result.time)}
							</TableBodyCell>
							<TableBodyCell>
								{usd.format(result.amount)}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</Card>
	</div>
{/if}
