import { gameHorses, horseOwners } from '$lib/stores/horseracing.js';
import { get } from 'svelte/store';
import getRandomInt from '$lib/utils/getRandomInt';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { shuffle } from '../universal';

const horseColors = ['Bay', 'Dark Bay', 'Chestnut', 'Black', 'Gray', 'White'];

export function generateAuctionHorses() {
	let newHorses = [];
	for (let i = 0; i < 12; i++) {
		let adjustment = 0;
		if (i <= 4) adjustment = 20;
		else if (i <= 8) adjustment = 40;
		else adjustment = 60;
		let newHorse = {
			name: uniqueNamesGenerator({
				dictionaries: [adjectives, animals, colors],
				separator: ' ',
				length: getRandomInt(1, 3),
				style: 'capital'
			}),
			color: horseColors[getRandomInt(0, horseColors.length)],
			rest: 100,
			restLoss: getRandomInt(50, 85),
			tuning: 100,
			tuneUp: getRandomInt(10, 15),
			tuningLoss: getRandomInt(2, 5),
			results: [],
			age: 2,
			current: {
				speed: getRandomInt(adjustment, adjustment + 40),
				stamina: getRandomInt(adjustment, adjustment + 40),
				agility: getRandomInt(adjustment, adjustment + 40)
			}
		};
		newHorse.potential = {
			speed: getRandomInt(newHorse.current.speed, 100),
			stamina: getRandomInt(newHorse.current.stamina, 100),
			agility: getRandomInt(newHorse.current.agility, 100)
		};
		newHorses.push(newHorse);
	}
	gameHorses.set(shuffle(newHorses));
}

export function generateHorse(level) {
	let adjustment = level * 10;
	if (level === 9) adjustment = 85;
	else if (level === 10) adjustment = 90;
	const owner = get(horseOwners)[getRandomInt(0, get(horseOwners).length)].name;
	return {
		name: uniqueNamesGenerator({
			dictionaries: [adjectives, animals, colors],
			separator: ' ',
			length: getRandomInt(1, 3),
			style: 'capital'
		}),
		color: horseColors[getRandomInt(0, horseColors.length)],
		owner,
		rest: getRandomInt(90, 100),
		tuning: getRandomInt(90, 100),
		current: {
			speed: getRandomInt(adjustment, adjustment + 10),
			stamina: getRandomInt(adjustment, adjustment + 10),
			agility: getRandomInt(adjustment, adjustment + 10)
		}
	};
}
