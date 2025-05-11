import {
	ETestCaseType,
	IGMapsConverterTestCase,
	IISVisibleTestCase,
} from "./isSatelliteVisibleTestsInterfaces";
import { getGeoPositionFromGMapsFormat } from "./isSatelliteVisibleTestsConsts";

export const isVisibleTestCases: IISVisibleTestCase[] = [
	{
		name: "Same Position JLM",
		input: {
			position1: getGeoPositionFromGMapsFormat(
				"31.778191002386542, 35.23540627536224",
			),
			position2: getGeoPositionFromGMapsFormat(
				"31.778191002386542, 35.23540627536224",
			),
		},
		expected: true,
	},
];

export const GMapsConverterTestCases: IGMapsConverterTestCase[] = [
	{
		name: "Testing JLM",
		type: ETestCaseType.STRICT_EQUAL,
		input: "31.77828679359432, 35.23533654140276",
		expected: {
			latitude: 31.77828679359432,
			longitude: 35.23533654140276,
		},
	},
	{
		name: "Testing Empty String",
		type: ETestCaseType.ERROR,
		input: "",
		expected: "Unknown position str",
	},
];
