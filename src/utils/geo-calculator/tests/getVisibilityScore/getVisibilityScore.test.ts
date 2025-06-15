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
	isSatelliteAbove,
	utils,
} from "@utils/geo-calculator/geoCalculatorConsts";

const { getDegreesFromRadians, getRadiansFromDegrees } = utils;

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

	// test("Doesn't meet required Conditions", () => {
	// 	const location = getRandomPosition();
	// 	const oppositeLocation: IGeoPosition = {
	// 		latitude: getOppositeAngle(location.latitude),
	// 		longitude: getOppositeAngle(location.longitude),
	// 	};
	// 	expect(
	// 		geoCalculator.getVisibilityScore({
	// 			devicePosition: location,
	// 			satellitePosition: oppositeLocation,
	// 			requiredConditions: [isOnSameHemisphere],
	// 		}),
	// 	).toBe(0);
	// });
	//
	// test("No Score Components", () => {
	// 	const location = getRandomPosition();
	// 	expect(
	// 		geoCalculator.getVisibilityScore({
	// 			devicePosition: location,
	// 			satellitePosition: location,
	// 			requiredConditions: [isOnSameHemisphere],
	// 		}),
	// 	).toBe(1);
	// });
	//
	// test("Empty Score Components", () => {
	// 	const location = getRandomPosition();
	// 	expect(
	// 		geoCalculator.getVisibilityScore({
	// 			devicePosition: location,
	// 			satellitePosition: location,
	// 			requiredConditions: [isOnSameHemisphere],
	// 			scoreComponents: [],
	// 		}),
	// 	).toBe(1);
	// });
});

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
