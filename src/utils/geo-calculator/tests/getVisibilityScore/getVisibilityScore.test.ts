import { describe, expect, test } from "vitest";
import {
	getGeoPositionFromGMapsFormat,
	getOppositeAngle,
	getRandomPosition,
} from "./getVisibilityScoreTestConsts";
import { EGeoCalculatorErrorType } from "../../geoCalculatorInterfaces";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import {
	degreesFromRadiansTestCases,
	EIsSatelliteVisibleLocation,
	testLocations,
} from "@utils/geo-calculator/tests/getVisibilityScore/getVisibilityScoreTestCases";
import {
	isOnSameHemisphere,
	isSatelliteAbove,
} from "@utils/geo-calculator/geoCalculatorConsts";
import { IGeoPosition } from "@common-types/positionTypes";
import { utils } from "@utils/geo-calculator/geoCalculatorConsts";

const { getDegreesFromRadians } = utils;

describe("Testing GMapsPosition Converter", () => {
	test("JLM", () => {
		expect(
			getGeoPositionFromGMapsFormat(
				testLocations[EIsSatelliteVisibleLocation.JLM].gmapsPosition,
			),
		).toStrictEqual({
			latitude: 31.77828679359432,
			longitude: 35.23533654140276,
		});
	});

	test("Random Location", () => {
		const randomLocation = getRandomPosition();

		expect(
			getGeoPositionFromGMapsFormat(
				`${randomLocation.latitude},${randomLocation.longitude}`,
			),
		).toStrictEqual(randomLocation);
	});

	test("Invalid Input", () => {
		const invalidInputs = ["", "a"];

		invalidInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculator.getErrorMessage(
					EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT,
				),
			);
		});
	});

	test("Invalid Angle", () => {
		const invalidAngleInputs = [",", ", ", "a,b"];

		invalidAngleInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculator.getErrorMessage(
					EGeoCalculatorErrorType.CONVERSION_INVALID_ANGLE,
				),
			);
		});
	});

	test("OutOfBounds Angle", () => {
		const outOfBoundsAngleInputs = ["500,5"];

		outOfBoundsAngleInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculator.getErrorMessage(
					EGeoCalculatorErrorType.CONVERSION_OUT_OF_BOUNDS_ANGLE,
				),
			);
		});
	});
});

describe("Testing Opposite Location", () => {
	const testCases: { input: number; expected: number }[] = [
		{ input: 10, expected: -170 },
		{ input: -10, expected: 170 },
		{ input: 100, expected: -80 },
	];

	test.each(testCases)("$input ----> $expected", ({ input, expected }) => {
		expect(getOppositeAngle(input)).toBe(expected);
	});
});

describe("Testing isOnSameHemisphere()", () => {
	test("Same Location", () => {
		const location = testLocations[EIsSatelliteVisibleLocation.JLM];
		expect(
			isOnSameHemisphere({
				devicePosition: location.position,
				satellitePosition: location.position,
			}),
		).toBe(true);
	});
	test("Same Random Location", () => {
		const location = getRandomPosition();
		expect(
			isOnSameHemisphere({
				devicePosition: location,
				satellitePosition: location,
			}),
		).toBe(true);
	});

	test("Same Hemisphere", () => {
		const location1 =
			testLocations[EIsSatelliteVisibleLocation.JLM].position;
		const location2 =
			testLocations[EIsSatelliteVisibleLocation.NEW_DELHI].position;

		expect(
			isOnSameHemisphere({
				devicePosition: location1,
				satellitePosition: location2,
			}),
		).toBe(true);
	});

	test("Same Hemisphere (far)", () => {
		const location1 =
			testLocations[EIsSatelliteVisibleLocation.JLM].position;
		const location2 =
			testLocations[EIsSatelliteVisibleLocation.PHILIPPINES].position;

		expect(
			isOnSameHemisphere({
				devicePosition: location1,
				satellitePosition: location2,
			}),
		).toBe(true);
	});

	test("Opposite Locations", () => {
		const location1 =
			testLocations[EIsSatelliteVisibleLocation.JLM].position;
		const location2: IGeoPosition = {
			latitude: getOppositeAngle(location1.latitude),
			longitude: getOppositeAngle(location1.longitude),
		};

		expect(
			isOnSameHemisphere({
				devicePosition: location1,
				satellitePosition: location2,
			}),
		).toBe(false);
	});

	test("Another Hemisphere", () => {
		const location1 =
			testLocations[EIsSatelliteVisibleLocation.JLM].position;
		const location2 =
			testLocations[EIsSatelliteVisibleLocation.AUSTRALIA].position;

		expect(
			isOnSameHemisphere({
				devicePosition: location1,
				satellitePosition: location2,
			}),
		).toBe(false);
	});
});

describe("Testing getVisibilityScore()", () => {
	test("Device Position Missing", () => {
		const location = getRandomPosition();
		expect(
			geoCalculator.getVisibilityScore({ satellitePosition: location }),
		).toBe(0);
	});

	test("Satellite Position Missing", () => {
		const location = getRandomPosition();
		expect(
			geoCalculator.getVisibilityScore({ devicePosition: location }),
		).toBe(0);
	});

	test("Doesn't meet required Conditions", () => {
		const location = getRandomPosition();
		const oppositeLocation: IGeoPosition = {
			latitude: getOppositeAngle(location.latitude),
			longitude: getOppositeAngle(location.longitude),
		};
		expect(
			geoCalculator.getVisibilityScore({
				devicePosition: location,
				satellitePosition: oppositeLocation,
				requiredConditions: [isOnSameHemisphere],
			}),
		).toBe(0);
	});

	test("No Score Components", () => {
		const location = getRandomPosition();
		expect(
			geoCalculator.getVisibilityScore({
				devicePosition: location,
				satellitePosition: location,
				requiredConditions: [isOnSameHemisphere],
			}),
		).toBe(1);
	});

	test("Empty Score Components", () => {
		const location = getRandomPosition();
		expect(
			geoCalculator.getVisibilityScore({
				devicePosition: location,
				satellitePosition: location,
				requiredConditions: [isOnSameHemisphere],
				scoreComponents: [],
			}),
		).toBe(1);
	});
});

describe("Testing RadiansConversion()", () => {
	test.each(degreesFromRadiansTestCases)(
		"$input ---> $expected",
		({ input, expected }) => {
			expect(getDegreesFromRadians(input)).toBe(expected);
		},
	);
});

describe("Testing isSatelliteAbove()", () => {
	test("Same Location", () => {
		const location = testLocations[EIsSatelliteVisibleLocation.JLM];
		expect(
			isSatelliteAbove({
				devicePosition: location.position,
				satellitePosition: location.position,
			}),
		).toBe(true);
	});

	test("Opposite Location", () => {
		const location =
			testLocations[EIsSatelliteVisibleLocation.JLM].position;
		const oppositeLocation =
			testLocations[EIsSatelliteVisibleLocation.AUSTRALIA].position;

		expect(
			isSatelliteAbove({
				devicePosition: location,
				satellitePosition: oppositeLocation,
			}),
		).toBe(false);
	});
});
