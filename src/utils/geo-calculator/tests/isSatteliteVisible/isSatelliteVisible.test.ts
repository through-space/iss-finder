import { describe, expect, test } from "vitest";
import { getGeoPositionFromGMapsFormat } from "./isSatelliteVisibleTestsConsts";
import { geoCalculatorErrorMessages } from "../../geoCalculatorConsts";
import { EGeoCalculatorErrorType } from "../../geoCalculatorInterfaces";

describe("Testing GMapsPosition Converter", () => {
	test("JLM", () => {
		expect(
			getGeoPositionFromGMapsFormat(
				"31.77828679359432, 35.23533654140276",
			),
		).toStrictEqual({
			latitude: 31.77828679359432,
			longitude: 35.23533654140276,
		});
	});

	test("Invalid Input", () => {
		const invalidInputs = ["", "a"];

		invalidInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculatorErrorMessages[
					EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT
				],
			);
		});
	});

	test("Invalid Angle", () => {
		const invalidAngleInputs = [",", ", ", "a,b"];

		invalidAngleInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculatorErrorMessages[
					EGeoCalculatorErrorType.CONVERSION_INVALID_ANGLE
				],
			);
		});
	});

	test("OutOfBounds Angle", () => {
		const outOfBoundsAngleInputs = ["500,5"];

		outOfBoundsAngleInputs.map((inputLocation) => {
			expect(() => getGeoPositionFromGMapsFormat(inputLocation)).toThrow(
				geoCalculatorErrorMessages[
					EGeoCalculatorErrorType.OUT_OF_BOUNDS_ANGLE
				],
			);
		});
	});
});

describe("Testing same hemisphere", () => {});
