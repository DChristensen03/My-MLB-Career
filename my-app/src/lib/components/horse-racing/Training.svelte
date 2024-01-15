<script>
	import {
		trainAgility,
		trainSpeed,
		trainStamina,
		spaTreatment,
		useWalker
	} from '$lib/utils/horse-racing/training';

	import { Tooltip, ButtonGroup, Button, Indicator } from 'flowbite-svelte';
	import {
		InfoCircleOutline,
		RocketOutline,
		HourglassOutline,
		AtomOutline,
		TailwindSolid,
		LifeBuoyOutline
	} from 'flowbite-svelte-icons';
	import { userBalance, userHorse } from '$lib/stores/horseracing';
	import { fade } from 'svelte/transition';
	import { usd } from '$lib/utils/universal';

	let speedUp, staminaUp, agilityUp, tuneUp, restUp;

	const trainingCost = 5000;
	const tuningCost = 20000;

	$: speedUp > 0 ? setTimeout(() => (speedUp = 0), 3000) : '';
	$: staminaUp > 0 ? setTimeout(() => (staminaUp = 0), 3000) : '';
	$: agilityUp > 0 ? setTimeout(() => (agilityUp = 0), 3000) : '';
	$: tuneUp > 0 ? setTimeout(() => (tuneUp = 0), 3000) : '';
	$: restUp > 0 ? setTimeout(() => (restUp = 0), 3000) : '';
</script>

<div>
	Training
	<span id="training-tip" class="inline-block">
		<InfoCircleOutline size="sm" />
	</span>
	<Tooltip triggeredBy="#training-tip">
		Each piece of training will upgrade the horses overall and get it tuned for a race. However, it
		will cost you {usd.format(trainingCost)}
		and rest.
	</Tooltip>
</div>
<div>
	<ButtonGroup>
		<Button
			class="relative"
			disabled={$userBalance - trainingCost < 0 || $userHorse.rest <= 0}
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
			disabled={$userBalance - trainingCost < 0 || $userHorse.rest <= 0}
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
			disabled={$userBalance - trainingCost < 0 || $userHorse.rest <= 0}
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

<div>
	Tuning
	<span id="tuning-tip" class="inline-block">
		<InfoCircleOutline size="sm" />
	</span>
	<Tooltip triggeredBy="#tuning-tip" class="w-1/2">
		Tuning allows you to get a horse ready for a race without losing rest or time. However, it will
		cost you {usd.format(tuningCost)}. Walking a horse will get the horse tuned for a race similar
		to training without losing any rest. Spa treatments will increase a horses rest to allow you to
		get to the races sooner.
	</Tooltip>
</div>
<div>
	<ButtonGroup>
		<Button
			class="relative"
			disabled={$userBalance - tuningCost < 0}
			on:click={() => (restUp = spaTreatment())}
		>
			Spa Treatment
			<LifeBuoyOutline size="sm" />
			{#if restUp > 0}
				<span transition:fade={{ delay: 250, duration: 300 }}>
					<Indicator color="red" border size="xl" class="z-30" placement="top-right">
						<span class="text-white text-xs font-bold">+{restUp}</span>
					</Indicator>
				</span>
			{/if}
		</Button>
		<Button
			class="relative"
			disabled={$userBalance - tuningCost < 0}
			on:click={() => (tuneUp = useWalker())}
		>
			Walker
			<TailwindSolid size="sm" />
			{#if tuneUp > 0}
				<span transition:fade={{ delay: 250, duration: 300 }}>
					<Indicator color="red" border size="xl" class="z-30" placement="top-right">
						<span class="text-white text-xs font-bold">+{tuneUp}</span>
					</Indicator>
				</span>
			{/if}
		</Button>
	</ButtonGroup>
</div>
