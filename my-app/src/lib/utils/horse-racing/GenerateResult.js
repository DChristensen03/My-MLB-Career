import { enteredRace, raceResult, userBalance, userHorse, week } from '$lib/stores/horseracing';
import { get } from 'svelte/store';
import { generateHorse } from './GenerateHorses';

const payoutStructure = [0.6, 0.2, 0.13, 0.05, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];

export default async function GenerateResult() {
	let results = [];
	const horses = await GenerateRaceHorses();
	const { distance, purse } = get(enteredRace);
	for (let horse of horses) {
		let result = {
			name: horse.name,
			owner: horse.owner,
			time: (await generateRaceTime(distance, horse)).reduce((partialSum, a) => partialSum + a, 0),
			amount: 0
		};
		results.push(result);
	}
	results = results.sort(function (a, b) {
		return parseFloat(a.time) - parseFloat(b.time);
	});
	for (let i = 0; i < horses.length; i++) {
		if (results[i]) {
			results[i].amount = payoutStructure[i] * purse;
			if (results[i].owner === 'Player') {
				userBalance.set(get(userBalance) + results[i].amount);
				let horse = get(userHorse);
				horse.results.unshift({
					name: get(enteredRace).name,
					type: get(enteredRace).type,
					winnings: results[i].amount,
					place: i + 1,
					date: get(week)
				});
			}
		} else {
			break;
		}
	}
	raceResult.set(results);
}

async function GenerateRaceHorses() {
	let horses = [get(userHorse)],
		numEntrants = 8;
	const { level } = get(enteredRace);
	if (level >= 8) numEntrants = 12;
	for (let i = 0; i < numEntrants - 1; i++) {
		horses.push(generateHorse(level));
	}
	return horses;
}

async function generateRaceTime(distance, horse) {
	let totalTime = [];
	const restMultiplier = 600 / (500 + horse.rest);
	const tuningMultiplier = 1000 / (900 + horse.tuning);
	const staminaPerFurlong = horse.current.stamina / distance;
	const speed = ((150 + staminaPerFurlong) / 200) * (horse.current.speed / 10);
	console.log(horse.name + ' ' + speed);
	for (let i = 0; i < distance; i++) {
		if (i % 4 === 0) {
			totalTime.push(100 - speed * ((300 + horse.current.agility) / 400));
		} else {
			totalTime.push(100 - speed);
		}
		totalTime[totalTime.length - 1] =
			totalTime.slice(-1) * 0.13 * restMultiplier * tuningMultiplier;
	}
	return totalTime;
}
