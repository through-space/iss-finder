import { IGeoPosition } from "../common-types/positionTypes";
import { useEffect, useRef, useState } from "react";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
//TODO: update only angles
// const UPDATE_DEVICE_ORIENTATION_INTERVAL = 5 * 1000;

export const useDeviceOrientation = () => {
	// const [a, setA] = useState(1);
	const storeLocation = useDeviceStateStore(
		(state) => state.updateCurrentPosition,
	);

	useEffect(() => {
		const clearInterval =
			deviceStateService.startLocationTracking(storeLocation);
		return () => {
			clearInterval();
		};
	}, [storeLocation]);

	useEffect(() => {
		deviceStateService
			.getOrientation()
			.then((orientation) => console.log(orientation))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// useEffect(() => {
	// 	deviceStateService.getOrientation();
	// window.addEventListener("deviceorientation", (e) => {
	// window.addEventListener("deviceorientationabsolute", (e) => {
	// console.log(e);
	// setEvent(e);
	// });
	// ondeviceorientationabsolute = (e) => {
	// 	setEvent(e);
	// };
	// }, []);

	// const intervalRef = useRef<NodeJS.Timeout>(null);
	// console.log("useDeviceOrientation()");
	// deviceStateService
	// 	.getOrientation()
	// 	.then(() => {
	// 		console.log("orientation resolve");
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
	//
	// const updateCurrentPosition = useDeviceStateStore(
	// 	(state) => state.updateCurrentPosition,
	// );
	//

	// const updateCurrentOrientation = () => {
	// 	console.log("updateCurrentOrientation()");
	// };

	// const updateDeviceOrientation = () => {
	// 	deviceStateService.getOrientation().then((data) => {
	// 		console.log("got new orientation:", data);
	// 	});
	// 	// deviceStateService.getLocation().then((location: IGeoPosition) => {
	// 	// 	console.log("location", location);
	// 	// 	updateCurrentOrientation();
	// 	// });
	// };
	//
	// useEffect(() => {
	// 	updateDeviceOrientation();
	//
	// 	intervalRef.current = setInterval(() => {
	// 		updateDeviceOrientation();
	// 	}, UPDATE_DEVICE_ORIENTATION_INTERVAL);
	//
	// 	return () => {
	// 		clearInterval(intervalRef.current);
	// 		intervalRef.current = null;
	// 	};
	// }, []);
};
