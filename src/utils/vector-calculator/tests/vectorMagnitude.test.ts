import { describe, expect, test } from "vitest";
import { utils } from "@utils/vector-calculator/vectorCalculatorConsts";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { getRandomNumber } from "@utils/vector-calculator/tests/utils";

const { getVectorMagnitude } = utils;

describe("Testing Vector Magnitude Calculation", () => {
	test("Empty Vector", () => {
		const vector = [];
		expect(getVectorMagnitude(vector)).toBe(0);
	});

	test("1D Vector", () => {
		const randomNumber = getRandomNumber();
		const vector = [randomNumber];
		expect(getVectorMagnitude(vector)).toBe(Math.abs(randomNumber));
	});

	test("2D Vector", () => {
		const randomNumbers = [...Array(2)].map(() => getRandomNumber());

		const vector = [randomNumbers[0], randomNumbers[1]];

		expect(getVectorMagnitude(vector)).toBe(
			Math.sqrt(randomNumbers[0] ** 2 + randomNumbers[1] ** 2),
		);
	});
	test("3D Vector", () => {
		const randomNumbers = [...Array(3)].map(() => getRandomNumber());

		const vector: T3DVector = [
			randomNumbers[0],
			randomNumbers[1],
			randomNumbers[2],
		];
		// const vector: T3DVector = [randomNumbers[0], randomNumbers[1], randomNumbers[2]];

		expect(getVectorMagnitude(vector)).toBe(
			Math.sqrt(
				randomNumbers[0] ** 2 +
					randomNumbers[1] ** 2 +
					randomNumbers[2] ** 2,
			),
		);
	});
});
