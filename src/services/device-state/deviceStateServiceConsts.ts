import { IGeoPosition } from "../../common-types/positionTypes";
import {
	IDeviceOrientation,
	TStopTrackingFunction,
} from "@services/device-state/deviceStateServiceInterfaces";

const UPDATE_DEVICE_POSITION_INTERVAL = 30 * 1000;

const getPositionFromGeolocationPosition = (
	geoLocation: GeolocationPosition,
): IGeoPosition => {
	return {
		latitude: geoLocation.coords.latitude,
		longitude: geoLocation.coords.longitude,
		altitude: geoLocation.coords.altitude,
	};
};

const getIsIOS = (): boolean => {
	return !(
		navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
		navigator.userAgent.match(/AppleWebKit/)
	);
};

export const getLocation = (): Promise<IGeoPosition> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
			// console.log(position);
			resolve(position.coords);
		}, reject);
	});
};

export const getOrientation = (): Promise<IDeviceOrientation> => {
	// return new Promise((resolve) => {
	// 	const mediaDevices = navigator.mediaDevices
	// 		.enumerateDevices()
	// 		.then((devices) => {
	// 			console.log(devices);
	// 		});
	// });
	// window.addEventListener("deviceorientation", (e) => {};
};

export const startLocationTracking = (
	onUpdate: (location: IGeoPosition) => void,
): TStopTrackingFunction => {
	const updateLocation = () =>
		getLocation()
			.then((location) => {
				onUpdate(location);
			})
			.catch((err) => {
				throw err;
			});

	updateLocation();

	const intervalId = setInterval(
		updateLocation,
		UPDATE_DEVICE_POSITION_INTERVAL,
	);

	return () => {
		clearInterval(intervalId);
	};
};

export const startOrientationTracking = (
	onUpdate: (orientation: IDeviceOrientation) => void,
): TStopTrackingFunction => {
	const intervalId = setInterval(() => {
		getOrientation().then((orientation) => {
			onUpdate(orientation);
		});
	}, UPDATE_DEVICE_POSITION_INTERVAL);

	return () => {
		clearInterval(intervalId);
	};
};
