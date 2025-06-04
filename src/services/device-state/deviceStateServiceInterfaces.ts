import { IGeoPosition } from "../../common-types/positionTypes";

export interface IDeviceOrientation {
	alpha: number;
	beta: number;
	gamma: number;
}

export type TStopTrackingFunction = () => void;

export interface IDeviceStateService {
	startLocationTracking: (
		onUpdate: (position: IGeoPosition) => void,
	) => TStopTrackingFunction;
	startOrientationTracking: (
		onUpdate: (position: IDeviceOrientation) => void,
	) => TStopTrackingFunction;
}
