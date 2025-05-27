import { IDaytimeServiceResponse } from "@services/daytime/daytimeServiceInterfaces";

const jlm: IDaytimeServiceResponse = {
	date: "2025-05-24",
	sunrise: "5:38:40 AM",
	sunset: "7:36:01 PM",
	first_light: "4:02:59 AM",
	last_light: "9:11:41 PM",
	dawn: "5:11:21 AM",
	dusk: "8:03:19 PM",
	solar_noon: "12:37:20 PM",
	golden_hour: "7:01:05 PM",
	day_length: "13:57:20",
	timezone: "Asia/Jerusalem",
	utc_offset: 180,
};

const newZealand: IDaytimeServiceResponse = {
	date: "2025-05-25",
	sunrise: "7:53:26 AM",
	sunset: "5:13:53 PM",
	first_light: "6:12:09 AM",
	last_light: "6:55:10 PM",
	dawn: "7:21:44 AM",
	dusk: "5:45:35 PM",
	solar_noon: "12:33:39 PM",
	golden_hour: "4:29:09 PM",
	day_length: "9:20:26",
	timezone: "Pacific/Auckland",
	utc_offset: 720,
};

export enum EDayTimeTestResponse {
	JLM,
	NEW_ZEALAND,
}

export const daytimeTestResponses: Record<
	EDayTimeTestResponse,
	IDaytimeServiceResponse
> = {
	[EDayTimeTestResponse.JLM]: jlm,
	[EDayTimeTestResponse.NEW_ZEALAND]: newZealand,
};
