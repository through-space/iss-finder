import { describe, expect, test } from "vitest";
import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import {
	EVectorCalculatorErrorType,
	getErrorMessage,
} from "@utils/vector-calculator/vectorCalculatorErrors";

import { utils } from "@utils/vector-calculator/vectorCalculatorConsts";
import {
	getRandomNumber,
	getRandomNumbers,
} from "@utils/vector-calculator/tests/utils";

const { getRadiansBetweenVectors } = utils;

describe("Testing getRadiansBetweenVectors()", () => {
	test("Empty Vectors", () => {
		const a: TVector = [];
		const b: TVector = [];
		expect(getRadiansBetweenVectors(a, b)).toBe(0);
	});

	test("Dimensions Dismatch", () => {
		const a: TVector = [1];
		const b: TVector = [1, 2];
		expect(() => getRadiansBetweenVectors(a, b)).toThrow(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	});

	test("Zero Vectors", () => {
		const a: TVector = [0, 0];
		const b: TVector = [1, 1];

		expect(getRadiansBetweenVectors(a, b)).toBe(0);
	});

	test("Collinear Vectors", () => {
		const randomNumbers = getRandomNumbers(2);
		const multiplier = getRandomNumber();

		const a: TVector = [randomNumbers[0], randomNumbers[1]];
		const b: TVector = [
			randomNumbers[0] * multiplier,
			randomNumbers[1] * multiplier,
		];

		expect(getRadiansBetweenVectors(a, b)).toBe(0);
	});

	test("90° Vectors", () => {
		const randomNumber = getRandomNumber();

		const a: TVector = [randomNumber, randomNumber];
		const b: TVector = [randomNumber, -randomNumber];

		expect(getRadiansBetweenVectors(a, b)).toBe(Math.PI / 2);
	});

	test("45° Vectors", () => {
		const randomNumber = getRandomNumber();

		const a: TVector = [randomNumber, randomNumber];
		const b: TVector = [randomNumber, 0];

		expect(getRadiansBetweenVectors(a, b)).toBe(Math.PI / 4);
	});
});
