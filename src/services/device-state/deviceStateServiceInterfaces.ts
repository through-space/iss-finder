import { IGeoPosition } from "@common-types/positionTypes";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

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
	getCameraDirection: (props: {
		position: IGeoPosition;
		prevOrientation: IDeviceOrientation;
		newOrientation: IDeviceOrientation;
	}) => T3DVector;
	startLocationTracking: (
		onUpdate: (position: IGeoPosition) => void,
	) => TStopTrackingFunction;
	startOrientationTracking: (
		onUpdate: (orientationEvent: DeviceOrientationEvent) => void,
	) => TStopTrackingFunction;
}

export type TDeviceAngle = "alpha" | "beta" | "gamma";
