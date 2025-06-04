import { IGeoPosition } from "../../common-types/positionTypes";

export interface IISSLocationResponse {
	altitude: number;
	latitude: number;
	longitude: number;
	timestamp: number;
}

export type TStopTrackingFunction = () => void;

export interface IISSLocationService {
	startLocationTracking: (
		onUpdate: (position: IGeoPosition) => void,
	) => TStopTrackingFunction;
}
