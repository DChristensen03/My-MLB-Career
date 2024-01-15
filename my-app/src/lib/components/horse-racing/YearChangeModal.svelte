<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { horseOwners, userHorse, userBalance } from '$lib/stores/horseracing';
	import getRandomInt from '$lib/utils/getRandomInt';
	import { usd } from '$lib/utils/universal';
	import { generateAuctionHorses } from '$lib/utils/horse-racing/GenerateHorses';

	export let open;

	let auctionOpen = false,
		ended = false;

	let aiBids = [],
		currentBid,
		reservePrice,
		bidOwner,
		expirationTime,
		timeToExpiration;

	function auctionHorse() {
		auctionOpen = true;
		generateBids();
		setInterval(aiBid, 250);
		setInterval(updateExpirationTime, 100);
		(expirationTime = Date.now() + 5000), (timeToExpiration = 5);
	}

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

	function generateBids() {
		for (let owner of $horseOwners) {
			const adjustment = (10 - owner.smarts) * 2;
			const totalOverall =
				($userHorse.current.speed + $userHorse.current.stamina + $userHorse.current.agility) / 3;
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
			aiBids.push({ name: owner.name, maxBid, money: owner.money });
		}
		// Generate reserve
		let totalBids = 0;
		for (let bid of aiBids) {
			totalBids += bid.maxBid;
		}
		reservePrice = totalBids / (aiBids.length * 2);
		reservePrice = Math.ceil(reservePrice / 100) * 100;
		currentBid = reservePrice;
	}

	function aiBid() {
		for (let bid of aiBids) {
			if (bid.name !== bidOwner)
				if (bid.money > currentBid + 10000 && bid.maxBid > currentBid + 10000) {
					currentBid += 10000;
					bidOwner = bid.name;
					setTimeout(aiBid, 1000);
					expirationTime = Date.now() + 5000;
				} else if (bid.money > currentBid + 1000 && bid.maxBid > currentBid + 1000) {
					currentBid += 1000;
					bidOwner = bid.name;
					setTimeout(aiBid, 1000);
					expirationTime = Date.now() + 5000;
				} else if (bid.money > currentBid + 100 && bid.maxBid > currentBid + 100) {
					currentBid += 100;
					bidOwner = bid.name;
					setTimeout(aiBid, 1000);
					expirationTime = Date.now() + 5000;
				}
		}
	}

	function setWinner() {
		ended = true;
		$userBalance += currentBid;
		$userHorse.owner = bidOwner;
		for (let owner of $horseOwners) {
			if (owner.name === bidOwner) {
				owner.money -= currentBid;
			}
		}
		generateAuctionHorses();
		$userHorse = null;
	}
</script>

<Modal bind:open>
	{#if !auctionOpen}
		<div class="grid grid-cols-1">
			At the end of each season you have the opportunity to sell your horse. A fully upgraded horse
			will likely sell for more than you payed for it and allow you to buy better horses. Upon
			selling your horse, you will be sent back to the auction house.
		</div>
		<div class="grid grid-cols-2 gap-2 justify-items-center">
			<div>
				<Button on:click={auctionHorse}>Auction Horse</Button>
			</div>
			<div>
				<Button on:click={() => (open = false)}>Keep Horse</Button>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-3 gap-2 justify-items-center">
			<div>
				{bidOwner}
			</div>
			<div>
				Current Bid: {usd.format(currentBid)}
			</div>
			<div>
				Time: {timeToExpiration}
			</div>
		</div>
	{/if}
</Modal>
