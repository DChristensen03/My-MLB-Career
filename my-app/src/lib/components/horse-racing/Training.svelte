<script>
	import { trainAgility, trainSpeed, trainStamina } from '$lib/utils/horse-racing/training';

	import { Tooltip, ButtonGroup, Button, Indicator } from 'flowbite-svelte';
	import {
		InfoCircleOutline,
		RocketOutline,
		HourglassOutline,
		AtomOutline
	} from 'flowbite-svelte-icons';
	import { userBalance, userHorse } from '$lib/stores/horseracing';
	import { fade } from 'svelte/transition';

	let speedUp, staminaUp, agilityUp;

	$: speedUp > 0 ? setTimeout(() => (speedUp = 0), 3000) : '';
	$: staminaUp > 0 ? setTimeout(() => (staminaUp = 0), 3000) : '';
	$: agilityUp > 0 ? setTimeout(() => (agilityUp = 0), 3000) : '';
</script>

<div>
	Training
	<span id="training-tip" class="inline-block">
		<InfoCircleOutline size="sm" />
	</span>
	<Tooltip triggeredBy="#training-tip">
		Each piece of training will upgrade the horses potential. However, it will cost you $500 and
		rest.
	</Tooltip>
</div>
<div>
	<ButtonGroup>
		<Button
			class="relative"
			disabled={$userBalance - 500 < 0 || $userHorse.rest <= 0}
			on:click={() => (speedUp = trainSpeed())}
		>
			Speed
			<RocketOutline size="sm" />
			{#if speedUp > 0}
				<span transition:fade={{ delay: 250, duration: 300 }}>
					<Indicator color="red" border size="xl" class="z-30" placement="top-right">
						<span class="text-white text-xs font-bold">+{speedUp}</span>
					</Indicator>
				</span>
			{/if}
		</Button>
		<Button
			class="relative"
			disabled={$userBalance - 500 < 0 || $userHorse.rest <= 0}
			on:click={() => (staminaUp = trainStamina())}
		>
			Stamina
			<HourglassOutline size="sm" />
			{#if staminaUp > 0}
				<span transition:fade={{ delay: 250, duration: 300 }}>
					<Indicator color="red" border size="xl" class="z-30" placement="top-right">
						<span class="text-white text-xs font-bold">+{staminaUp}</span>
					</Indicator>
				</span>
			{/if}
		</Button>
		<Button
			class="relative"
			disabled={$userBalance - 500 < 0 || $userHorse.rest <= 0}
			on:click={() => (agilityUp = trainAgility())}
		>
			Agility
			<AtomOutline class="w-4 h-4 me-2" size="sm" />
			{#if agilityUp > 0}
				<span transition:fade={{ delay: 250, duration: 300 }}>
					<Indicator color="red" border size="xl" class="z-30" placement="top-right">
						<span class="text-white text-xs font-bold">+{agilityUp}</span>
					</Indicator>
				</span>
			{/if}
		</Button>
	</ButtonGroup>
</div>
