import {
	EAxis,
	TMatrix,
	TVector,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";
import {
	EVectorCalculatorErrorType,
	getErrorMessage,
} from "@utils/vector-calculator/vectorCalculatorErrors";

export const getDotProduct = (a: TVector, b: TVector): number => {
	if (a.length !== b.length) {
		throw new Error(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	}

	return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
};

export const multiplyMatrices = (a: TMatrix, b: TMatrix): TMatrix => {
	if (!Array.isArray(a) || !Array.isArray(b)) {
		throw new Error("Both arguments must be 2D arrays");
	}

	const aRows = a.length;
	const aCols = a[0].length;
	const bRows = b.length;
	const bCols = b[0].length;

	// Ensure all rows in 'a' have same length
	if (!a.every((row) => row.length === aCols)) {
		throw new Error("All rows in matrix A must have the same length");
	}

	// Ensure all rows in 'b' have same length
	if (!b.every((row) => row.length === bCols)) {
		throw new Error("All rows in matrix B must have the same length");
	}

	if (aCols !== bRows) {
		throw new Error(
			`Matrix A's columns (${aCols}) must match Matrix B's rows (${bRows})`,
		);
	}

	const result = Array.from({ length: aRows }, () => Array(bCols).fill(0));

	for (let i = 0; i < aRows; i++) {
		for (let j = 0; j < bCols; j++) {
			for (let k = 0; k < aCols; k++) {
				result[i][j] += a[i][k] * b[k][j];
			}
		}
	}

	return result;
};

export const getRotationMatrix = (
	axis: EAxis,
	angleRadians: number,
): TMatrix => {
	const cos = Math.cos(angleRadians);
	const sin = Math.sin(angleRadians);

	switch (axis) {
		case EAxis.X:
			return [
				[1, 0, 0],
				[0, cos, -sin],
				[0, sin, cos],
			];
		case EAxis.Y:
			return [
				[cos, 0, sin],
				[0, 1, 0],
				[-sin, 0, cos],
			];
		case EAxis.Z:
			return [
				[cos, -sin, 0],
				[sin, cos, 0],
				[0, 0, 1],
			];
		default:
			throw new Error("Axis must be 'x', 'y', or 'z'");
	}
};
