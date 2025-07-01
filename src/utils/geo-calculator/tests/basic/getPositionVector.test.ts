import { describe, expect, test } from "vitest";
import { IGeoPosition } from "@common-types/positionTypes";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { getPositionVector } from "@utils/geo-calculator/geoCalculatorConsts";

expect.extend({
	toBeEqualPositionVectors(received: T3DVector, expected: T3DVector) {
		const threshold = 1e-6;

		const pass = received.every(
			(_, key) => Math.abs(received[key] - expected[key]) < threshold,
		);

		return {
			pass,
			message: () =>
				`Locations ${received} and ${expected} are not equal`,
		};
	},
});

const testLocations: {
	position: IGeoPosition;
	vector: T3DVector;
	name: string;
}[] = [
	{
		name: "Null Island",
		position: { latitude: 0, longitude: 0 },
		vector: [1, 0, 0],
	},
	{
		name: "North Pole",
		position: { latitude: 90, longitude: 0 },
		vector: [0, 0, 1],
	},
	{
		name: "South Pole",
		position: { latitude: -90, longitude: 0 },
		vector: [0, 0, -1],
	},
	{
		name: "Greenwich",
		position: { latitude: 51.49, longitude: 0 },
		vector: [0.622651218, 0, 0.78249949],
	},
];

describe("Testing GeoLocation to 3d Vector conversion", () => {
	test.each(testLocations)(
		"$name: $position ----> $vector",
		({ position, vector }) => {
			expect(getPositionVector(position)).toBeEqualPositionVectors(
				vector,
			);
		},
	);
});
