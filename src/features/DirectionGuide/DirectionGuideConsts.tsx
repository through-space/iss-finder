import { FC } from "react";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";

export const DirectionGuide: FC = () => {
	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	const cameraDirectionVector = useDeviceStateStore(
		(state) => state.direction,
	);

	const issDirection = useIssStateStore((state) => state.currentPosition);
	const issDirectionVector = geoCalculator.getGeoPositionVector(issDirection);

	const getRoundedDirection = (angle: number) => {
		const roundFactor = 1e3;
		return Math.round(angle * roundFactor) / roundFactor;
	};

	return (
		<>
			<>
				<h5>device orientation</h5>
				<ul>
					<li>alpha: {Math.round(deviceOrientation?.alpha)}</li>
					<li>beta: {Math.round(deviceOrientation?.beta)}</li>
					<li>gamma: {Math.round(deviceOrientation?.gamma)}</li>
				</ul>
			</>
			<>
				<h5>direction</h5>
				{cameraDirectionVector && (
					<ul>
						<li>
							x: {getRoundedDirection(cameraDirectionVector[0])}
						</li>
						<li>
							y: {getRoundedDirection(cameraDirectionVector[1])}
						</li>
						<li>
							z: {getRoundedDirection(cameraDirectionVector[2])}
						</li>
					</ul>
				)}
			</>
		</>
	);
};
