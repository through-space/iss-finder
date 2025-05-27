import { IISSVisibleLocation } from "./getVisibilityScoreTestInterfaces";

export enum EIsSatelliteVisibleLocation {
	JLM,
	DEAD_SEA,
	PHILIPPINES,
	NEW_DELHI,
	AUSTRALIA,
}

export const testLocations: Record<
	EIsSatelliteVisibleLocation,
	IISSVisibleLocation
> = {
	[EIsSatelliteVisibleLocation.JLM]: {
		name: "JLM",
		gmapsPosition: "31.77828679359432, 35.23533654140276",
		position: {
			latitude: 31.77828679359432,
			longitude: 35.23533654140276,
		},
	},
	[EIsSatelliteVisibleLocation.DEAD_SEA]: {
		name: "Dead Sea",
		position: {
			latitude: 31.578336618744608,
			longitude: 35.48677526768387,
		},
	},
	[EIsSatelliteVisibleLocation.PHILIPPINES]: {
		name: "Philippines",
		gmapsPosition: "14.597823652930169, 120.98453699399431",
		position: {
			latitude: 14.597823652930169,
			longitude: 120.98453699399431,
		},
	},
	[EIsSatelliteVisibleLocation.NEW_DELHI]: {
		name: "New Delhi",
		gmapsPosition: "28.61624403422123, 77.188289213835",
		position: {
			latitude: 28.61624403422123,
			longitude: 77.188289213835,
		},
	},
	[EIsSatelliteVisibleLocation.AUSTRALIA]: {
		name: "Australia, Sydney",
		gmapsPosition: "-33.87517390851123, 151.22306138522714",
		position: {
			latitude: -33.87517390851123,
			longitude: 151.22306138522714,
		},
	},
};

export const degreesFromRadiansTestCases: {
	input: number;
	expected: number;
}[] = [
	{ input: 0, expected: 0 },
	{ input: Math.PI / 2, expected: 90 },
	{ input: Math.PI, expected: 180 },
	{ input: 2 * Math.PI, expected: 0 },
	{ input: 3 * Math.PI, expected: 180 },
];
