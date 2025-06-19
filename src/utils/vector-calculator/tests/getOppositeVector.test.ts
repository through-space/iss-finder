import { describe, test, expect } from "vitest";
import {
	getRandomNumber,
	getRandomNumbers,
} from "@utils/vector-calculator/tests/utils";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { utils } from "@utils/vector-calculator/vectorCalculatorConsts";

const { getOppositeVector } = utils;

describe("Testing getOppositeVector()", () => {
	test("Empty Vector", () => {
		const vector = [];
		expect(vector).toEqual(vector);
	});
	test("1D Vector", () => {
		const randomNumber = getRandomNumber();
		const vector = [randomNumber];
		expect(getOppositeVector(vector)).toEqual([-randomNumber]);
	});

	test("2D Vector", () => {
		const randomNumbers = getRandomNumbers(2);

		const vector = [randomNumbers[0], randomNumbers[1]];

		expect(getOppositeVector(vector)).toEqual([
			-randomNumbers[0],
			-randomNumbers[1],
		]);
	});
	test("3D Vector", () => {
		const randomNumbers = getRandomNumbers(3);

		const vector: T3DVector = [
			randomNumbers[0],
			randomNumbers[1],
			randomNumbers[2],
		];

		expect(getOppositeVector(vector)).toEqual([
			-randomNumbers[0],
			-randomNumbers[1],
			-randomNumbers[2],
		]);
	});
	// const randomNumber = getRandomNumber();
});
