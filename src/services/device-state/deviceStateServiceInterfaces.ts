import { IGeoPosition } from "../../common-types/positionTypes";

export interface IDeviceOrientation {
	alpha: number;
	beta: number;
	gamma: number;
}

export interface IDeviceOrientationEventiOS extends DeviceOrientationEvent {
	requestPermission?: () => Promise<"granted" | "denied">;
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
