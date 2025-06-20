//TODO: add onError

import { IDeviceStateService } from "@services/device-state/deviceStateServiceInterfaces";
import {
	getCameraDirection,
	startLocationTracking,
	startOrientationTracking,
} from "@services/device-state/deviceStateServiceConsts";

export const deviceStateService: IDeviceStateService = {
	getCameraDirection,
	startLocationTracking,
	startOrientationTracking,
};
