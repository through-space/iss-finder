import { describe, expect, test } from "vitest";
import { IGeoPosition } from "@common-types/positionTypes";
import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";
import { utils as geoCalculatorUtils } from "@utils/geo-calculator/geoCalculatorConsts";

const getRandomPosition = geoCalculatorUtils.getRandomPosition;

expect.extend({
	toBeEqualPositionVectors(received: TVector, expected: TVector) {
		const threshold = 1e-2;

		const pass = received.every(
			(_, key) => Math.abs(received[key] - expected[key]) < threshold,
		);

		return {
			pass,
			message: () => `${received} ---> ${expected}`,
		};
	},
});

const RANDOM_POSITIONS_NUMBER = 10;

const randomPositions = Array.from({ length: RANDOM_POSITIONS_NUMBER }, () =>
	getRandomPosition(),
);

const testLocations: IGeoPosition[] = [
	{ latitude: 0, longitude: 0 },
	{ latitude: 90, longitude: 0 },
	{ latitude: -90, longitude: 0 },
	{ latitude: 51.49, longitude: 0 },
	{
		latitude: 30,
		longitude: 30,
		altitude: 0,
	},
	{
		latitude: 30,
		longitude: -30,
		altitude: 0,
	},
	...randomPositions,
];

const orientations: Record<string, IDeviceOrientation> = {
	"display-down": { alpha: 0, beta: -180, gamma: 0 },
	"display-up": { alpha: 0, beta: 0, gamma: 0 },
};

describe("Testing getCameraDirection(), Display Up", () => {
	test.each(testLocations)("Position: $latitude, $longitude", (position) => {
		const orientation = orientations["display-up"];

		const cameraDirection = deviceStateService.getCameraDirection({
			orientation,
			position,
		});

		const positionVector = geoCalculator.getGeoPositionVector(position);

		const oppositeGeoPositionVector =
			vectorCalculator.getOppositeVector(positionVector);

		expect(
			vectorCalculator.normalizeVector(cameraDirection),
		).toBeEqualPositionVectors(
			vectorCalculator.normalizeVector(oppositeGeoPositionVector),
		);
	});
});

describe("Testing getCameraDirection(), Display Down", () => {
	test.each(testLocations)("$latitude, $longitude", (position) => {
		const orientation = orientations["display-down"];

		const cameraDirection = deviceStateService.getCameraDirection({
			position,
			orientation,
		});

		const positionVector = vectorCalculator.normalizeVector(
			geoCalculator.getGeoPositionVector(position),
		);

		expect(
			vectorCalculator.normalizeVector(cameraDirection),
		).toBeEqualPositionVectors(
			vectorCalculator.normalizeVector(positionVector),
		);
	});
});
