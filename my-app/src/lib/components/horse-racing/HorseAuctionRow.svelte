<script>
	import { Button, TableBodyRow, Modal, Heading, ButtonGroup } from 'flowbite-svelte';
	import TableBodyCell from '$lib/MyTableBodyCell.svelte';
	import { EyeOutline } from 'flowbite-svelte-icons';
	import { generateComments } from '$lib/utils/horse-racing/comments.js';
	import { userBalance, userHorse, horseOwners } from '$lib/stores/horseracing.js';
	import getRandomInt from '$lib/utils/getRandomInt';
	import { onMount } from 'svelte';
	import { usd } from '$lib/utils/universal';

	export let horse;

	let modalOpen = false,
		started = false,
		ended = false;

	let currentBid = 0,
		bidOwner = '',
		expirationTime = Date.now() + 5000,
		timeToExpiration = 5;

	let bloodstockComments;

	updateExpirationTime();
	setInterval(updateExpirationTime, 100);

	onMount(() => {
		bloodstockComments = generateComments(horse);
		ended = false;
	});

	function updateExpirationTime() {
		if (!ended) {
			if (timeToExpiration > 0)
				timeToExpiration = parseFloat(((expirationTime - Date.now()) / 1000).toFixed(1));
			else {
				timeToExpiration = 0;
				setWinner();
			}
		}
	}

	function placeBid(amount) {
		if (currentBid + amount <= $userBalance) {
			currentBid += amount;
			bidOwner = 'Player';
		}

		setTimeout(generateBids, 1000);
		expirationTime = Date.now() + 5000;
	}

	function generateBids() {
		for (let owner of $horseOwners) {
			const adjustment = (10 - owner.smarts) * 2;
			const totalOverall =
				(horse.current.speed + horse.current.stamina + horse.current.agility) / 3;
			const perceivedOverall = getRandomInt(totalOverall - adjustment, totalOverall + adjustment);
			// generate bid owner is willing to make
			let maxBid = 0;
			if (perceivedOverall >= 90) {
				maxBid = perceivedOverall * (200000 / (20 - (10 - owner.aggressiveness)));
			} else if (perceivedOverall >= 70) {
				maxBid = perceivedOverall * (70000 / (20 - (10 - owner.aggressiveness)));
			} else if (perceivedOverall >= 50) {
				maxBid = perceivedOverall * (30000 / (20 - (10 - owner.aggressiveness)));
			} else {
				maxBid = perceivedOverall * (10000 / (20 - (10 - owner.aggressiveness)));
			}
			if (owner.money > currentBid + 10000 && maxBid > currentBid + 10000) {
				currentBid += 10000;
				bidOwner = owner.name;
				setTimeout(generateBids, 1000);
				expirationTime = Date.now() + 5000;
			} else if (owner.money > currentBid + 1000 && maxBid > currentBid + 1000) {
				currentBid += 1000;
				bidOwner = owner.name;
				setTimeout(generateBids, 1000);
				expirationTime = Date.now() + 5000;
			} else if (owner.money > currentBid + 100 && maxBid > currentBid + 100) {
				currentBid += 100;
				bidOwner = owner.name;
				setTimeout(generateBids, 1000);
				expirationTime = Date.now() + 5000;
			}
		}
	}

	function setWinner() {
		ended = true;
		horse.owner = bidOwner;
		if (bidOwner == 'Player') {
			$userBalance -= currentBid;
			$userHorse = horse;
		} else {
			for (let owner of $horseOwners) {
				if (owner.name === bidOwner) {
					owner.money -= currentBid;
				}
			}
		}
	}
</script>

<TableBodyRow>
	<TableBodyCell>{horse.name}</TableBodyCell>
	<TableBodyCell>{horse.color}</TableBodyCell>
	<TableBodyCell
		><Button
			outline
			size="xs"
			class="!p-2"
			disabled={horse.owner !== ''}
			on:click={() => (modalOpen = true)}><EyeOutline size="sm" class="w-3 h-3" /></Button
		></TableBodyCell
	>
</TableBodyRow>

<Modal bind:open={modalOpen}>
	<Heading tag="h5">{horse.name}</Heading>
	<div>
		Bloodstock Agent Comments:<br />
		{@html bloodstockComments}
	</div>
	{#if !started}
		<div class="grid grid-cols-1 justify-items-center">
			<Button
				on:click={() => {
					(expirationTime = Date.now() + 5000), (timeToExpiration = 5);
					ended = false;
					started = true;
					placeBid(0);
				}}>Start Auction</Button
			>
		</div>
	{:else if started && ended}
		This auction has ended
	{:else}
		<div class="grid grid-cols-3 justify-items-center">
			<div>
				Current Bid: {usd.format(currentBid)}
			</div>
			<div>
				{bidOwner} <br />
				Time: {timeToExpiration}
			</div>
			<div>
				<ButtonGroup>
					<Button
						size="sm"
						disabled={currentBid + 100 > $userBalance}
						on:click={() => placeBid(100)}>Bid +$100</Button
					>
					<Button
						size="sm"
						disabled={currentBid + 1000 > $userBalance}
						on:click={() => placeBid(1000)}>Bid +$1000</Button
					>
					<Button
						size="sm"
						disabled={currentBid + 10000 > $userBalance}
						on:click={() => placeBid(10000)}>Bid +$10,000</Button
					>
				</ButtonGroup>
			</div>
		</div>
	{/if}
</Modal>
