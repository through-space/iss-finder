import { describe, expect, test } from "vitest";
import { utils } from "../daytimeServiceConsts";
import {
	apiDateConversionTestCases,
	oppositeOffsetTestCases,
} from "@services/daytime/tests/data/dateConversionTestCases";
import { getOppositeTimezoneOffset } from "@services/daytime/helpers";
import { isDaytimeCalcStrategies } from "@services/daytime/calculationStrategies";
import { EIsDaytimeCalculationStrategy } from "@services/daytime/daytimeServiceInterfaces";
import {
	daytimeTestResponses,
	EDayTimeTestResponse,
} from "@services/daytime/tests/data/daytimeTestResponses";

//TODO: add tests for illegal inputs

describe("Testing Opposite Timezone Offset", () => {
	test.each(oppositeOffsetTestCases)(
		"$input ---> $expected",
		({ input, expected }) => {
			expect(getOppositeTimezoneOffset(input)).toBe(expected);
		},
	);
});

describe("Testing getTimeStampFromAPIDate()", async () => {
	const getTimeStampFromAPIDate = utils.getTimeStampFromAPIDate;

	test.each(apiDateConversionTestCases)("$name", ({ input, expected }) => {
		expect(
			getTimeStampFromAPIDate(input.date, input.utc_offset, input.time),
		).toBe(expected);
	});
});

describe("Testing is getIsDaytimeByTotalDarkness()", () => {
	const getIsDaytime =
		isDaytimeCalcStrategies[
			EIsDaytimeCalculationStrategy.BY_TOTAL_DARKNESS
		];
	const localeUtcOffset = 180;
	const localDayTimestamp =
		new Date(2025, 4, 24, 10, 0, 0, 0).getTime() / 1000 - localeUtcOffset;
	const localNightTimestamp =
		new Date(2025, 4, 24, 23, 0, 0, 0).getTime() / 1000 - localeUtcOffset;

	test("JLM Day", () => {
		const mockResponse = daytimeTestResponses[EDayTimeTestResponse.JLM];
		expect(
			getIsDaytime({
				timestamp: localDayTimestamp,
				apiResponse: mockResponse,
			}),
		).toBe(true);
	});
	test("JLM Night", () => {
		const mockResponse = daytimeTestResponses[EDayTimeTestResponse.JLM];

		expect(
			getIsDaytime({
				timestamp: localNightTimestamp,
				apiResponse: mockResponse,
			}),
		).toBe(false);
	});

	test("NewZealand Night, Local Day", () => {
		const mockResponse =
			daytimeTestResponses[EDayTimeTestResponse.NEW_ZEALAND];
		expect(
			getIsDaytime({
				timestamp: localDayTimestamp,
				apiResponse: mockResponse,
			}),
		).toBe(false);
	});
	test("NewZealand Day, Local Day", () => {
		const mockResponse =
			daytimeTestResponses[EDayTimeTestResponse.NEW_ZEALAND];
		expect(
			getIsDaytime({
				timestamp: localNightTimestamp,
				apiResponse: mockResponse,
			}),
		).toBe(true);
	});
});
