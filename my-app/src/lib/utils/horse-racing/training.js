import { userHorse, userBalance } from '$lib/stores/horseracing';
import { get } from 'svelte/store';
import getRandomInt from '../getRandomInt';

const trainingCost = 5000;
const tuningCost = 20000;

export function trainSpeed() {
	let balance = get(userBalance);
	if (balance - trainingCost >= 0) {
		let amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.speed + amount > horse.potential.speed) {
			amount = horse.potential.speed - horse.current.speed;
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
		let amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.stamina + amount > horse.potential.stamina) {
			amount = horse.potential.stamina - horse.current.stamina;
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
		let amount = getRandomInt(1, 4);
		let horse = get(userHorse);
		if (horse.current.agility + amount > horse.potential.agility) {
			amount = horse.potential.agility - horse.current.agility;
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

export function useWalker() {
	let balance = get(userBalance);
	if (balance - tuningCost >= 0) {
		let horse = get(userHorse);
		let amount = Math.ceil(horse.tuneUp / 3);
		if (horse.tuning + amount > 100) {
			amount = 100 - horse.tuning;
			horse.tuning = 100;
		} else {
			horse.tuning += amount;
		}
		userHorse.set(horse);
		balance -= tuningCost;
		userBalance.set(balance);
		return amount;
	}
	return 0;
}

export function spaTreatment() {
	let balance = get(userBalance);
	if (balance - tuningCost >= 0) {
		let amount = getRandomInt(3, 6);
		let horse = get(userHorse);
		if (horse.rest + amount > 100) {
			amount = 100 - horse.rest;
			horse.rest = 100;
		} else {
			horse.rest += amount;
		}
		userHorse.set(horse);
		balance -= tuningCost;
		userBalance.set(balance);
		return amount;
	}
	return 0;
}
