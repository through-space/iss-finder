import { IGeoPosition } from "../../common-types/positionTypes";

export interface IDeviceStateStore {
	position?: IGeoPosition;
	updateCurrentPosition?: (position: IGeoPosition) => void;
	geolocationPositionFull: GeolocationPosition;
	updateGeolocationPositionFull: (
		geolocationPosition: GeolocationPosition,
	) => void;
}
