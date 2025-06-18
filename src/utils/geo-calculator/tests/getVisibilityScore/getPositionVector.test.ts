import { expect } from "vitest";
import { IPositionVector } from "@common-types/positionTypes";

expect.extend({
	toBeEqualPositionVectors(
		received: IPositionVector,
		expected: IPositionVector,
	) {
		const threshold = 1000;
		const checkedKeys = ["x", "y", "z"];

		const pass = checkedKeys.every(
			(key) => Math.abs(received[key] - expected[key]) < threshold,
		);

		return {
			pass,
			message: () => `Locations are equal`,
		};
	},
});

// describe("Testing getPositionVector()", () => {});
