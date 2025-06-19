export const getRandomNumber = (): number => {
	return 2 * Math.random() - 1;
};

export const getRandomNumbers = (length: number): number[] => {
	return [...Array(length)].map(() => getRandomNumber());
};
