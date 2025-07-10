import { describe, expect, test } from "vitest";
import { IGeoPosition } from "@common-types/positionTypes";
import {
	T3DVector,
	TVector,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { getGeoPositionVector } from "@utils/geo-calculator/geoCalculatorConsts";

expect.extend({
	toBeEqualPositionVectors(received: TVector, expected: TVector) {
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
		vector: [6378137, 0, 0],
	},
	{
		name: "North Pole",
		position: { latitude: 90, longitude: 0 },
		vector: [0, 0, 6356752.314245184],
	},
	{
		name: "South Pole",
		position: { latitude: -90, longitude: 0 },
		vector: [0, 0, -6356752.314245184],
	},
	{
		name: "Greenwich",
		position: { latitude: 51.49, longitude: 0 },
		vector: [3979519.182354739, 0, 4967669.785605569],
	},
];

describe("Testing GeoLocation to 3d Vector conversion", () => {
	test.each(testLocations)(
		"$name: $position ----> $vector",
		({ position, vector }) => {
			expect(getGeoPositionVector(position)).toBeEqualPositionVectors(
				vector,
			);
		},
	);
});
