import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import {
	EVectorCalculatorErrorType,
	getErrorMessage,
} from "@utils/vector-calculator/vectorCalculatorErrors";
import {
	getVectorMagnitude,
	isNullVector,
} from "@utils/vector-calculator/operations/vector";
import { getDotProduct } from "@utils/vector-calculator/operations/matrix";

export const getVectorsSum = (a: TVector, b: TVector) => {
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
