<script>
	import { Heading, Button } from 'flowbite-svelte';
	import { generateAuctionHorses } from '$lib/utils/horse-racing/GenerateHorses.js';
	import { userHorse } from '$lib/stores/horseracing.js';
	import Auction from '$lib/components/horse-racing/Auction.svelte';
	import Stable from '$lib/components/horse-racing/Stable.svelte';

	let auctionStarted = false;

	function handleStartAuction() {
		generateAuctionHorses();
		auctionStarted = true;
	}
</script>

<svelte:head>
	<title>My Sports Career - Horse Racing</title>
	<meta
		name="description"
		content="Experience Realistic Simulated Horse Racing - Play our immersive virtual horse racing simulation, strategic gameplay, and thrilling seasons. Dive into the world of virtual horse racing today!"
	/>
</svelte:head>

<div>
	{#if $userHorse == null}
		<div class="flex flex-col items-center gap-2">
			{#if !auctionStarted}
				<div>
					<Heading tag="h3">Welcome to My Horse Racing Career</Heading>
				</div>

				<div>
					<Button on:click={handleStartAuction} type="button">Start Auction</Button>
				</div>
			{:else}
				<Auction />
			{/if}
		</div>
	{:else}
		<div class="grid grid-cols-1 justify-items-center gap-2">
			<Stable />
		</div>
	{/if}
</div>
