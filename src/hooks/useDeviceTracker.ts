import { IGeoPosition } from "@common-types/positionTypes";
import { useEffect, useRef } from "react";
import { deviceLocationService } from "@services/device-location/deviceLocation";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
//TODO: update only angles
const UPDATE_DEVICE_POSITION_INTERVAL = 5 * 60 * 1000;

export const useDeviceTracker = () => {
	const intervalRef = useRef<NodeJS.Timeout>(null);

	const updateCurrentPosition = useDeviceStateStore(
		(state) => state.updateCurrentPosition,
	);

	const updateDeviceLocation = () => {
		deviceLocationService
			.getDeviceLocation()
			.then((location: IGeoPosition) => {
				updateCurrentPosition(location);
			});
	};

	useEffect(() => {
		updateDeviceLocation();

		intervalRef.current = setInterval(() => {
			updateDeviceLocation();
		}, UPDATE_DEVICE_POSITION_INTERVAL);

		return () => {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		};
	}, [updateCurrentPosition]);
};
