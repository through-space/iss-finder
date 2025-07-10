import "vitest";
import { IGeoPosition } from "@common-types/positionTypes";
import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

interface CustomMatchers<R = unknown> {
	toBeEqualLocations: (expected: IGeoPosition) => R;
	toBeEqualPositionVectors: (expected: TVector) => R;
	toBeSomething: (expected: number) => R;
}

declare module "vitest" {
	interface Matchers<T = any> extends CustomMatchers<T> {}
}
