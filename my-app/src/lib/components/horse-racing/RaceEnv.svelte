<script>
	import background from '$lib/images/Horse Racing Game Assets/PNG/Backgound 1/Background 1-1.png';
	import RaceResults from './RaceResults.svelte';

	export let results = [];

	let resultsOpen = true;
</script>

<img class="background-img" src={background} />

<RaceResults bind:open={resultsOpen} />
