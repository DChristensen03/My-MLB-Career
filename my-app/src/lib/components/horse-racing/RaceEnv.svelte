<script>
	import background from '$lib/images/Horse Racing Game Assets/PNG/Backgound 1/Background 1-1.png';
	import RaceResults from './RaceResults.svelte';

	export let resultsOpen = false;
</script>

<img class="background-img" alt="racetrack" src={background} />

<RaceResults bind:open={resultsOpen} />
