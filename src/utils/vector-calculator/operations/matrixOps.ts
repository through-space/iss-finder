import {
	T3DVector,
	TMatrix,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";

export const vectorToMatrix = (vector: T3DVector): TMatrix =>
	vector.map((val) => [val]);

export const matrixToVector3D = (matrix: TMatrix): T3DVector => {
	if (
		matrix.length !== 3 ||
		!matrix.every((row) => Array.isArray(row) && row.length === 1)
	) {
		throw new Error("Matrix must be 3×1 to convert to T3DVector");
	}

	return [matrix[0][0], matrix[1][0], matrix[2][0]];
};
