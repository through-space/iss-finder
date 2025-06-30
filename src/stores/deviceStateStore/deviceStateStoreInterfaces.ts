import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

export interface IDeviceStateStore {
	position?: IGeoPosition;
	orientation?: IDeviceOrientation;
	direction?: T3DVector;
	updatePosition?: (position: IGeoPosition) => void;
	updateOrientation?: (orientation: IDeviceOrientation) => void;
	updateDirection?: (direction: T3DVector) => void;
}
