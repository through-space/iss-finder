import { describe, expect, test } from "vitest";
import { utils } from "@utils/vector-calculator/vectorCalculatorConsts";
import { TVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import {
	EVectorCalculatorErrorType,
	getErrorMessage,
} from "@utils/vector-calculator/vectorCalculatorErrors";
import {
	getRandomNumber,
	getRandomNumbers,
} from "@utils/vector-calculator/tests/utils";

const { getVectorsSum, getOppositeVector } = utils;

describe("Testing getVectorsSum()", () => {
	test("Empty Vectors", () => {
		const a: TVector = [];
		const b: TVector = [];
		expect(getVectorsSum(a, b)).toEqual([]);
	});

	test("Dimensions Dismatch", () => {
		const a: TVector = [];
		const b: TVector = [1];
		expect(() => getVectorsSum(a, b)).toThrow(
			getErrorMessage(EVectorCalculatorErrorType.DIMENSIONS_DISMATCH),
		);
	});

	test("1D Same Vectors", () => {
		const randomNumber = getRandomNumber();
		const vector = [randomNumber];
		expect(getVectorsSum(vector, vector)).toEqual([randomNumber * 2]);
	});

	test("Opposite Vectors", () => {
		const dimensions = Math.ceil(Math.random() * 100);
		const randomNumbers = getRandomNumbers(dimensions);
		const vector = [...Array(dimensions)].map(
			(_, index) => randomNumbers[index],
		);

		expect(getVectorsSum(vector, getOppositeVector(vector))).toEqual(
			[...Array(dimensions)].map(() => 0),
		);
	});

	test("2D Different Vectors", () => {
		const randomNumbers = getRandomNumbers(4);

		const a = [randomNumbers[0], randomNumbers[1]];
		const b = [randomNumbers[2], randomNumbers[3]];

		expect(getVectorsSum(a, b)).toEqual([
			randomNumbers[0] + randomNumbers[2],
			randomNumbers[1] + randomNumbers[3],
		]);
	});

	test("3D Different Vectors", () => {
		const randomNumbers = getRandomNumbers(6);

		const a = [randomNumbers[0], randomNumbers[1], randomNumbers[2]];
		const b = [randomNumbers[3], randomNumbers[4], randomNumbers[5]];

		expect(getVectorsSum(a, b)).toEqual([
			randomNumbers[0] + randomNumbers[3],
			randomNumbers[1] + randomNumbers[4],
			randomNumbers[2] + randomNumbers[5],
		]);
	});
});
