import { describe, expect, test, vi } from "vitest";
import { daytimeServiceErrorMessages } from "@services/daytime/daytimeServiceConsts";
import { EDaytimeServiceError } from "@services/daytime/daytimeServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import {
	EMockLocation,
	testLocations,
} from "@services/daytime/tests/data/daytimeTestLocations";
import { utils } from "../daytimeServiceConsts";

const { getDaytimeData } = utils;

describe("Testing Daytime Service Fetch Data", () => {
	test("Invalid Lon/Lat provided", async () => {
		const invalidLocations: IGeoPosition[] = [
			{ latitude: 40, longitude: -300 },
			{ latitude: 300, longitude: -40 },
		];

		const mockedFetchData = vi.fn((location: IGeoPosition) =>
			getDaytimeData(location),
		);

		for (const location of invalidLocations) {
			await expect(() => mockedFetchData(location)).rejects.toThrow(
				daytimeServiceErrorMessages[EDaytimeServiceError.NO_LOCATION],
			);
		}
	});
	test("No Connection", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockRejectedValue(new Error("original error")),
		);

		const location = testLocations[EMockLocation.JLM].position;

		await expect(utils.getDaytimeData(location)).rejects.toThrow(
			daytimeServiceErrorMessages[EDaytimeServiceError.FETCH_ERROR],
		);

		vi.unstubAllGlobals();
	});
});

vi.mock("./daytimeServiceConsts", () => ({
	getDaytimeData: vi.fn(),
}));

describe("Testing Day/Night Calculations", () => {
	// const mockedFetchData = vi.fn((location: IGeoPosition) =>
	// 	getDaytimeData(location),
	// );
	//
	// test("No Connection", async () => {
	// 	expect(() => getDaytimeData())
	// });
});
// vi.mock("../daytimeServiceConsts", () => ({
// 	getDaytimeData: vi.fn(),
// }));
//
// vi.spyOn(daytimeServiceConsts, "getDaytimeData").mockResolvedValue({
// 	x: 10,
// });

// vi.spyOn(daytimeServiceConsts, "getDaytimeData").mockResolvedValue(
// 	daytimeTestResponses[EDayTimeTestResponse.JLM],
// );
// const location = testLocations[EMockLocation.JLM].position;
// const mockResponse = daytimeTestResponses[EDayTimeTestResponse.JLM];
// const localeUtcOffset = 180;
//
// test("JLM Day", async () => {
// 	const timestamp = new Date(2025, 1, 1, 14).getTime() - ;
//
// 	// utils.getCalculatedDaytime(mockResponse);
// 	// TODO: add mock fetch
// 	await expect(
// 		daytimeService.isDaytime({ timestamp, location }),
// 	).resolves.toBe(true);
// });
// });
