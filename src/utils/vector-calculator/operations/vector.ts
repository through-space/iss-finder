import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

export const isNullVector = (vector: TVector): boolean => {
	return (
		vector.length === 0 ||
		vector.every((component) => component === 0 || component === null)
	);
};

export const getVectorMagnitude = (vector: TVector): number => {
	return Math.hypot(...vector);
};

export const getOppositeVector = (vector: TVector): TVector => {
	return vector.map((component) => {
		return -component;
	});
};

export const scaleVector = (vector: TVector, scalar: number): TVector => {
	return vector.map((component) => {
		return component * scalar;
	});
};

export const normalizeVector = (vector: TVector): TVector => {
	const length = Math.hypot(...vector);
	return vector.map((component) => component / length);
};
