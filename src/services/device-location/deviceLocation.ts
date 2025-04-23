// TODO: add ts

//TODO: add onError

import { IGeoPosition } from "../../types/positionTypes";

const getPositionFromGeolocationPosition = (
	geoLocation: GeolocationPosition,
): IGeoPosition => {
	return {
		latitude: geoLocation.coords.latitude,
		longitude: geoLocation.coords.longitude,
		altitude: geoLocation.coords.altitude,
	};
};

const getDeviceLocation = (): Promise<IGeoPosition> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => resolve(getPositionFromGeolocationPosition(position)),
			reject,
		);
	});
};

export const deviceLocationService = {
	getDeviceLocation,
};
