import { useEffect } from "react";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";

export const useDeviceOrientation = () => {
	const storeOrientation = useDeviceStateStore(
		(state) => state.updateOrientation,
	);

	useEffect(() => {
		const stopOrientationTracking =
			deviceStateService.startOrientationTracking(storeOrientation);
		return () => {
			stopOrientationTracking();
		};
	}, [storeOrientation]);
};
