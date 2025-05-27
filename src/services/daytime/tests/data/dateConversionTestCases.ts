import {
	daytimeTestResponses,
	EDayTimeTestResponse,
} from "@services/daytime/tests/data/daytimeTestResponses";
import { IApiDateConversionTestCase } from "@services/daytime/tests/daytimeServiceTestInterfaces";

export const oppositeOffsetTestCases: { input: number; expected: number }[] = [
	{ input: 0, expected: -720 },
	{ input: 720, expected: 0 },
	{ input: -720, expected: 0 },
	{ input: -180, expected: 540 },
	{ input: 180, expected: -540 },
	{ input: 600, expected: -120 },
];

export const apiDateConversionTestCases: IApiDateConversionTestCase[] = [
	{
		name: "New Zealand",
		input: {
			date: daytimeTestResponses[EDayTimeTestResponse.NEW_ZEALAND].date,
			utc_offset:
				daytimeTestResponses[EDayTimeTestResponse.NEW_ZEALAND]
					.utc_offset,
			time: daytimeTestResponses[EDayTimeTestResponse.NEW_ZEALAND]
				.sunrise,
		},
		// ToDo: not the best strategy for tests
		expected: 1748116406,
	},
	{
		name: "JLM",
		input: {
			date: daytimeTestResponses[EDayTimeTestResponse.JLM].date,
			utc_offset:
				daytimeTestResponses[EDayTimeTestResponse.JLM].utc_offset,
			time: daytimeTestResponses[EDayTimeTestResponse.JLM].sunrise,
		},
		expected: 1748054320,
	},
];
