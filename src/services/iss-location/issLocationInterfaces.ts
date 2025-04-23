import { IGeoPosition } from "../../types/positionTypes";

export interface IISSLocationResponse {
	altitude: number;
	latitude: number;
	longitude: number;
	timestamp: number;
}

export interface IISSLocationAPI {
	getISSLocation: () => Promise<IGeoPosition>;
}
