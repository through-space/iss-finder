import { IVectorCalculator } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { getRadiansBetweenVectors } from "@utils/vector-calculator/operations/vectorOps";
import {
	getRotationMatrix,
	multiplyMatrices,
} from "@utils/vector-calculator/operations/matrix";
import {
	matrixToVector3D,
	vectorToMatrix,
} from "@utils/vector-calculator/operations/matrixOps";
import {
	getOppositeVector,
	isNullVector,
	normalizeVector,
} from "@utils/vector-calculator/operations/vector";
import {
	getDegreesFromRadians,
	getRadiansFromDegrees,
} from "@utils/vector-calculator/operations/basic";

export const vectorCalculator: IVectorCalculator = {
	isNullVector,
	getRadiansFromDegrees,
	getDegreesFromRadians,
	getRadiansBetweenVectors,
	getRotationMatrix,
	multiplyMatrices,
	vectorToMatrix,
	matrixToVector3D,
	getOppositeVector,
	normalizeVector,
};
