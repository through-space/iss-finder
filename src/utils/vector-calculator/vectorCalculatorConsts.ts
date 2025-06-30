import {
	getOppositeVector,
	getVectorMagnitude,
} from "@utils/vector-calculator/operations/vector";
import {
	getRadiansBetweenVectors,
	getVectorsSum,
} from "@utils/vector-calculator/operations/vectorOps";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

export const NULL_3D_VECTOR: T3DVector = [0, 0, 0];

export const utils = {
	getVectorMagnitude,
	getRadiansBetweenVectors,
	getVectorsSum,
	getOppositeVector,
};
