import { userHorse, userBalance } from '$lib/stores/horseracing';
import { get } from 'svelte/store';
import getRandomInt from '../getRandomInt';

const trainingCost = 5000;

export function trainSpeed() {
	let balance = get(userBalance);
	if (balance - trainingCost >= 0) {
		const amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.speed + amount > horse.potential.speed) {
			horse.current.speed = horse.potential.speed;
		} else {
			horse.current.speed += amount;
		}
		horse.rest -= 5;
		userHorse.set(horse);
		balance -= trainingCost;
		userBalance.set(balance);
		return amount;
	}
	return 0;
}

export function trainStamina() {
	let balance = get(userBalance);
	if (balance - trainingCost >= 0) {
		const amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.stamina + amount > horse.potential.stamina) {
			horse.current.stamina = horse.potential.stamina;
		} else {
			horse.current.stamina += amount;
		}
		horse.rest -= 5;
		userHorse.set(horse);
		balance -= trainingCost;
		userBalance.set(balance);
		return amount;
	}
	return 0;
}

export function trainAgility() {
	let balance = get(userBalance);
	if (balance - trainingCost >= 0) {
		const amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.agility + amount > horse.potential.agility) {
			horse.current.agility = horse.potential.agility;
		} else {
			horse.current.agility += amount;
		}
		horse.rest -= 5;
		horse.tuning += horse.tuneUp;
		userHorse.set(horse);
		balance -= trainingCost;
		userBalance.set(balance);
		return amount;
	}
	return 0;
}
