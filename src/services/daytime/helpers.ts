export const getTimeStampFromAPIDate = (
	dateStr: string,
	utc_offset: number,
	ampmTime: string,
): number => {
	const [time, ampm] = ampmTime.split(" ");

	// todo: add offset
	const [rawHour, minutes, seconds] = time
		.trim()
		.split(":")
		.map((str) => parseInt(str));
	const hours = ampm === "PM" ? rawHour + 12 : rawHour;
	const ms = 0;
	const [year, month, day] = dateStr.split("-").map((str) => parseInt(str));

	const monthIndex = month - 1;

	const localeTimezoneOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;
	const utcOffsetMS = utc_offset * 60 * 1000;
	const localeDateTimestamp = new Date(
		year,
		monthIndex,
		day,
		hours,
		minutes,
		seconds,
		ms,
	).getTime();

	return (localeDateTimestamp - localeTimezoneOffsetMS - utcOffsetMS) / 1000;
};

export const getOppositeTimezoneOffset = (localOffset: number): number => {
	/**
	 * " + 12 * 60 " moves to positive values [0, 1440]
	 * oppositeOffset moves to opposite timezone
	 * "- 12 * 60 " moves back to [-720, 720]
	 */
	const oppositeOffset = 12 * 60;
	return ((localOffset + 12 * 60 + oppositeOffset) % 1440) - 12 * 60;
};
