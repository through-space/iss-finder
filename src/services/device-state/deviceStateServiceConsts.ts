import {
	IDeviceOrientation,
	IDeviceOrientationEventiOS,
	TStopTrackingFunction,
} from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

const UPDATE_DEVICE_POSITION_INTERVAL = 30 * 1000;

const getIsIOS = (): boolean => {
	return !!(DeviceOrientationEvent as unknown as IDeviceOrientationEventiOS)
		.requestPermission;
};

export const getLocation = (): Promise<IGeoPosition> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
			// console.log(position);
			resolve(position.coords);
		}, reject);
	});
};

export const startLocationTracking = (
	onUpdate: (location: IGeoPosition) => void,
): TStopTrackingFunction => {
	const throwError = (error: Error) => {
		console.error(error.message);
		throw error;
	};

	const updateLocation = () =>
		getLocation()
			.then((location) => {
				onUpdate(location);
			})
			.catch(throwError);

	updateLocation().catch(throwError);

	const intervalId = setInterval(
		() => updateLocation().catch(throwError),
		UPDATE_DEVICE_POSITION_INTERVAL,
	);

	return () => {
		clearInterval(intervalId);
	};
};

export const startOrientationTracking = (
	onUpdate: (orientation: IDeviceOrientation) => void,
): TStopTrackingFunction => {
	if (getIsIOS()) {
		(DeviceOrientationEvent as unknown as IDeviceOrientationEventiOS)
			.requestPermission()
			.then((response) => {
				if (response === "granted") {
					window.addEventListener(
						"deviceorientation",
						onUpdate,
						true,
					);
				} else {
					alert("has to be allowed!");
				}
			})
			.catch(() => alert("not supported"));
	} else {
		window.addEventListener(
			// TODO: "deviceorientation" vs "deviceorientationabsolute"
			// "deviceorientationabsolute",

			"deviceorientation",
			(e) => onUpdate(e),
			true,
		);
	}

	return () => {
		window.removeEventListener("deviceorientation", onUpdate, true);
		window.removeEventListener("deviceorientationabsolute", onUpdate, true);
	};
};
