import { IISSVisibleLocation } from "@utils/geo-calculator/tests/getVisibilityScore/getVisibilityScoreTestInterfaces";

export enum EMockLocation {
	JLM,
	PHILIPPINES,
	NEW_DELHI,
	AUSTRALIA,
}

export const testLocations: Record<EMockLocation, IISSVisibleLocation> = {
	[EMockLocation.JLM]: {
		name: "JLM",
		gmapsPosition: "31.77828679359432, 35.23533654140276",
		position: {
			latitude: 31.77828679359432,
			longitude: 35.23533654140276,
		},
	},
	[EMockLocation.PHILIPPINES]: {
		name: "Philippines",
		gmapsPosition: "14.597823652930169, 120.98453699399431",
		position: {
			latitude: 14.597823652930169,
			longitude: 120.98453699399431,
		},
	},
	[EMockLocation.NEW_DELHI]: {
		name: "New Delhi",
		gmapsPosition: "28.61624403422123, 77.188289213835",
		position: {
			latitude: 28.61624403422123,
			longitude: 77.188289213835,
		},
	},
	[EMockLocation.AUSTRALIA]: {
		name: "Australia, Sydney",
		gmapsPosition: "-33.87517390851123, 151.22306138522714",
		position: {
			latitude: -33.87517390851123,
			longitude: 151.22306138522714,
		},
	},
};
