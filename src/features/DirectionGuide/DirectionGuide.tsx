import { FC } from "react";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";

export const DirectionGuide: FC = () => {
	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	const satellitePosition = useIssStateStore(
		(state) => state.currentPosition,
	);

	return (
		<ul>
			<li>alpha: {Math.round(deviceOrientation?.alpha)}</li>
			<li>beta: {Math.round(deviceOrientation?.beta)}</li>
			<li>gamma: {Math.round(deviceOrientation?.gamma)}</li>
		</ul>
	);
};
