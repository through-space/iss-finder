// TODO: add ts

//TODO: add onError

import { IDeviceStateService } from "@services/device-state/deviceStateServiceInterfaces";
import {
	startLocationTracking,
	startOrientationTracking,
} from "@services/device-state/deviceStateServiceConsts";

export const deviceStateService: IDeviceStateService = {
	startLocationTracking,
	startOrientationTracking,
	// getLocation,
	// getOrientation,
};
