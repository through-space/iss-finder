export type TVector = number[];

export type T3DVector = [x: number, y: number, z: number];

export interface IVectorCalculator {
	getRadiansBetweenVectors: (a: TVector, b: TVector) => number;
}
