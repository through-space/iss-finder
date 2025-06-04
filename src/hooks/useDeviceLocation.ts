import { useEffect } from "react";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";

export const useDeviceLocation = () => {
	const storeLocation = useDeviceStateStore(
		(state) => state.updateCurrentPosition,
	);

	useEffect(() => {
		const stopLocationTracking =
			deviceStateService.startLocationTracking(storeLocation);
		return () => {
			stopLocationTracking();
		};
	}, [storeLocation]);
};
