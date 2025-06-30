export const getRadiansFromDegrees = (degrees: number) => {
	const normalizedDegrees = degrees % 360;
	return (normalizedDegrees * Math.PI) / 180;
};
// TODO: check negative values
export const getDegreesFromRadians = (radians: number) => {
	return ((180 / Math.PI) * radians) % 360;
};
