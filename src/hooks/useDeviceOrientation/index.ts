import { useCallback, useEffect, useRef } from "react";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
import { DEVICE_STORE_UPDATE_DELAY } from "@config/constants";
import { isSameOrientation } from "@hooks/useDeviceOrientation/helpers";

export const useDeviceOrientation = () => {
	const saveOrientation = useDeviceStateStore(
		(state) => state.updateOrientation,
	);
	const saveDirection = useDeviceStateStore((state) => state.updateDirection);
	const orientation = useRef<IDeviceOrientation | null>(null);

	const debouncedSaveOrientation = useDebouncedCallback(
		(orientation, direction) => {
			saveOrientation(orientation);
			saveDirection(direction);
		},
		DEVICE_STORE_UPDATE_DELAY,
		[saveOrientation, saveDirection],
	);

	const updateOrientation = useCallback(
		(e: DeviceOrientationEvent) => {
			const { alpha, beta, gamma } = e;
			const newOrientation: IDeviceOrientation = { alpha, beta, gamma };
			const position = useDeviceStateStore.getState().position;

			if (!newOrientation) {
				return;
			}

			if (!orientation.current) {
				orientation.current = newOrientation;
			}

			console.log("current orientation");
			console.log(orientation.current);
			console.log("new orientation");
			console.log(newOrientation);
			if (isSameOrientation(orientation.current, newOrientation)) {
				console.log("same orientation");
				return;
			}

			const newDirection = deviceStateService.getCameraDirection({
				position,
				orientation: newOrientation,
			});

			debouncedSaveOrientation(newOrientation, newDirection);
			orientation.current = newOrientation;
		},
		[debouncedSaveOrientation, orientation],
	);

	useEffect(() => {
		const stopOrientationTracking =
			deviceStateService.startOrientationTracking(updateOrientation);
		return () => {
			stopOrientationTracking();
		};
	}, [updateOrientation]);
};
