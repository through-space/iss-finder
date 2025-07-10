import { describe, expect, test } from "vitest";
import {
	getDegreesFromRadians,
	getRadiansFromDegrees,
} from "@utils/vector-calculator/operations/basic";

const degreesFromRadiansTestCases: {
	radians: number;
	degrees: number;
}[] = [
	{ radians: 0, degrees: 0 },
	{ radians: Math.PI / 2, degrees: 90 },
	{ radians: Math.PI, degrees: 180 },
	{ radians: 2 * Math.PI, degrees: 0 },
	{ radians: 3 * Math.PI, degrees: 180 },
];

describe("Testing RadiansToDegreesConversion()", () => {
	test.each(degreesFromRadiansTestCases)(
		"$radians ---> $degrees",
		({ radians, degrees }) => {
			expect(getDegreesFromRadians(radians)).toBe(degrees);
		},
	);
});

describe("Testing DegreesToRadiansConversion()", () => {
	test.each(degreesFromRadiansTestCases)(
		"$degrees ---> $radians",
		({ degrees, radians }) => {
			expect(getRadiansFromDegrees(degrees)).toBe(
				radians - Math.floor(radians / (2 * Math.PI)) * Math.PI * 2,
			);
		},
	);
});
