import { IGeoPosition } from "@common-types/positionTypes";

export interface IDeviceStateStore {
	altitude?: number;
	position: IGeoPosition;
	updateCurrentPosition: (position: IGeoPosition) => void;
}
