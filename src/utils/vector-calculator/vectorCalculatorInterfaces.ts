export type TVector = number[];

export type T3DVector = [x: number, y: number, z: number];

export type TMatrix = TVector[];

export enum EAxis {
	X,
	Y,
	Z,
}

export interface IVectorCalculator {
	isNullVector: (vector: TVector) => boolean;
	getRadiansBetweenVectors: (a: TVector, b: TVector) => number;
	getRadiansFromDegrees: (degrees: number) => number;
	getDegreesFromRadians: (radians: number) => number;
	getRotationMatrix: (axis: EAxis, radians: number) => TMatrix;
	multiplyMatrices: (a: TMatrix, b: TMatrix) => TMatrix;
	vectorToMatrix: (vector: TVector) => TMatrix;
	matrixToVector3D: (matrix: TMatrix) => T3DVector;
}
