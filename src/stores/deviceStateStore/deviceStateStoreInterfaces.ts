import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

export interface IDeviceStateStore {
	position?: IGeoPosition;
	orientation?: IDeviceOrientation;
	updateCurrentPosition?: (position: IGeoPosition) => void;
	updateOrientation?: (orientation: IDeviceOrientation) => void;
}
