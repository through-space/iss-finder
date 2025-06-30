// import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
// import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
//
// export const debouncedSaveOrientation = useDebouncedCallback(
// 	(orientation: IDeviceOrientation, direction) => {
// 		saveOrientation(orientation);
// 		saveDirection(direction);
// 	},
// 	DEVICE_STORE_UPDATE_DELAY,
// );

import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { ORIENTATION_CHANGE_TOLERANCE } from "@hooks/useDeviceOrientation/constants";
const dimensions = ["alpha", "beta", "gamma"];

export const isSameOrientation = (
	prevOrientation: IDeviceOrientation,
	curOrientation: IDeviceOrientation,
): boolean => {
	return dimensions.every(
		(dimension) =>
			Math.abs(curOrientation[dimension] - prevOrientation[dimension]) <
			ORIENTATION_CHANGE_TOLERANCE,
	);
};
