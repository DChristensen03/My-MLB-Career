import getRandomInt from '$lib/utils/getRandomInt';

export function generateComments(horse) {
	let comments = 'Right now, ';
	let bsSpeed = getRandomInt(horse.current.speed - 10, horse.current.speed + 10),
		bsStamina = getRandomInt(horse.current.stamina - 10, horse.current.stamina + 10),
		bsAgility = getRandomInt(horse.current.agility - 10, horse.current.agility + 10);

	let bsPotential =
		getRandomInt(
			horse.potential.speed + horse.potential.stamina + horse.potential.agility - 30,
			horse.potential.speed + horse.potential.stamina + horse.potential.agility + 30
		) / 3;

	if (bsSpeed > 90) {
		comments += `this horse is crazy fast, it might be the best speed I've ever seen. And `;
	} else if (bsSpeed > 70) {
		comments += `he's got some good speed, it'll play in the big races. And `;
	} else if (bsSpeed > 40) {
		comments += `there's some speed there but it's hard to say how much. However, `;
	} else {
		comments += `I've seen mules that can run faster than this horse. But `;
	}

	if (bsStamina > 90) {
		comments += `he can run for ages, the long races should never be an issue. `;
	} else if (bsStamina > 70) {
		comments += `this horse has a lot of legs, it'll stay the distance. `;
	} else if (bsStamina > 40) {
		comments += `it's an average runner. `;
	} else {
		comments += `I wouldn't count on it in much more than a quarters race. `;
	}

	if (bsAgility > 90) {
		comments += `Good news too, if racing doesn't workout this horse has a career in barreling for sure.`;
	} else if (bsAgility > 70) {
		comments += `Just as well though, this horse will definitely get between horses well.`;
	} else if (bsAgility > 40) {
		comments += `However, it may need some training on the turns.`;
	} else {
		comments += `And other jockeys better pray they aren't on the outside of this horse on the turns or they might make a rail sandwich.`;
	}

	comments += '<br><br>';

	if (bsPotential > 90) {
		comments += `That being said this horses potential is through the roof.`;
	} else if (bsPotential > 70) {
		comments += `Regardless of where it is now it probably has some room to improve.`;
	} else if (bsPotential > 40) {
		comments += `There's probably not a whole lot of room for improement.`;
	} else {
		comments += `This horse might just be better off not being allowed within 300 yards of a racetrack.`;
	}

	return comments;
}
