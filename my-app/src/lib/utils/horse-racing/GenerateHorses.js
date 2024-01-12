import { gameHorses } from '$lib/stores/horseracing.js';
import getRandomInt from '$lib/utils/getRandomInt';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const horseColors = ['Bay', 'Dark Bay', 'Chestnut', 'Black', 'Gray', 'White'];

export function generateAuctionHorses() {
	let newHorses = [];
	for (let i = 0; i < 12; i++) {
		let newHorse = {
			name: uniqueNamesGenerator({
				dictionaries: [adjectives, animals, colors],
				separator: ' ',
				length: getRandomInt(1, 3),
				style: 'capital'
			}),
			color: horseColors[getRandomInt(0, horseColors.length)],
			rest: 100,
			current: {
				speed: getRandomInt(20, 100),
				stamina: getRandomInt(20, 100),
				agility: getRandomInt(20, 100)
			}
		};
		newHorse.potential = {
			speed: getRandomInt(newHorse.current.speed, 100),
			stamina: getRandomInt(newHorse.current.stamina, 100),
			agility: getRandomInt(newHorse.current.agility, 100)
		};
		newHorses.push(newHorse);
	}
	gameHorses.set(newHorses);
}
