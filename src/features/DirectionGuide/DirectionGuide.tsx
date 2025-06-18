import { FC } from "react";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";

export const DirectionGuide: FC = () => {
	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	const satellitePosition = useIssStateStore(
		(state) => state.currentPosition,
	);

	// const satellitePositionVector = geoCalculator.
	return (
		<ul>
			<li>alpha: {Math.round(deviceOrientation?.alpha)}</li>
			<li>beta: {Math.round(deviceOrientation?.beta)}</li>
			<li>gamma: {Math.round(deviceOrientation?.gamma)}</li>
		</ul>
	);
};
