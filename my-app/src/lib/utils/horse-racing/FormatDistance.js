export default function FormatDistance(distance) {
	if (distance < 8) {
		if (Number.isInteger(distance)) return `${distance}f`;
		else return `${Math.floor(distance)} 1/2f`;
	} else if (distance == 8) {
		return `1 mile`;
	} else {
		const remainder = distance % 8;
		const miles = Math.floor(distance / 8);
		if (Number.isInteger(remainder)) {
			if (remainder == 2 || remainder == 6) {
				return `${miles} ${remainder / 2}/4 miles`;
			} else if (remainder == 4) {
				return `${miles} ${remainder / 4}/2 miles`;
			} else {
				return `${miles} ${remainder}/8 miles`;
			}
		} else return `${miles} ${remainder * 2}/16 miles`;
	}
}
