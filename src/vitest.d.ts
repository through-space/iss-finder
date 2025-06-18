import "vitest";
import { IGeoPosition, IPositionVector } from "@common-types/positionTypes";

interface CustomMatchers<R = unknown> {
	toBeEqualLocations: (expected: IGeoPosition) => R;
	toBeEqualPositionVectors: (expected: IPositionVector) => R;
}

declare module "vitest" {
	interface Matchers<T = any> extends CustomMatchers<T> {}
}
