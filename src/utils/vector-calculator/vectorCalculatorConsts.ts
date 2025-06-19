import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import {
	EVectorCalculatorErrorType,
	getErrorMessage,
} from "@utils/vector-calculator/vectorCalculatorErrors";

const isNullVector = (vector: TVector): boolean => {
	return (
		vector.length === 0 ||
		vector.every((component) => component === 0 || component === null)
	);
};

const getDotProduct = (a: TVector, b: TVector): number => {
	if (a.length !== b.length) {
		throw new Error(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	}

	return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
};

const getVectorMagnitude = (vector: TVector): number => {
	return Math.sqrt(
		vector.reduce((sum, component) => sum + component ** 2, 0),
	);
};

const getVectorsSum = (a: TVector, b: TVector) => {
	if (a.length !== b.length) {
		throw new Error(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	}

	return a.reduce((resultVector, component, i) => {
		resultVector.push(component + b[i]);
		return resultVector;
	}, []);
};

const getOppositeVector = (vector: TVector): TVector => {
	return vector.map((component) => -component);
};

/*
 a·b =|a|*|b|*cos(⍺)
 */
export const getRadiansBetweenVectors = (a: TVector, b: TVector): number => {
	if (a.length !== b.length) {
		throw new Error(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	}

	if (isNullVector(a) || isNullVector(b)) {
		return 0;
	}

	return (
		Math.acos(
			getDotProduct(a, b) /
				(getVectorMagnitude(a) * getVectorMagnitude(b)),
		) % Math.PI
	);
};

export const utils = {
	getVectorMagnitude,
	getRadiansBetweenVectors,
	getVectorsSum,
	getOppositeVector,
};
