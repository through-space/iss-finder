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
	return vector.map((component) => -component);
};
