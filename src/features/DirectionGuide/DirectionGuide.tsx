import { FC } from "react";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";

export const DirectionGuide: FC = () => {
	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	const cameraDirectionVector = useDeviceStateStore(
		(state) => state.direction,
	);
	const issPosition = useIssStateStore((state) => state.currentPosition);
	const devicePosition = useDeviceStateStore((state) => state.position);

	const devicePositionVector =
		geoCalculator.getGeoPositionVector(devicePosition);
	const issPositionVector = geoCalculator.getGeoPositionVector(issPosition);

	const getRoundedVectorComponent = (angle: number) => {
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
				<h5>cameraDirectionVector</h5>
				{cameraDirectionVector && (
					<ul>
						<li>
							x:{" "}
							{getRoundedVectorComponent(
								cameraDirectionVector[0],
							)}
						</li>
						<li>
							y:{" "}
							{getRoundedVectorComponent(
								cameraDirectionVector[1],
							)}
						</li>
						<li>
							z:{" "}
							{getRoundedVectorComponent(
								cameraDirectionVector[2],
							)}
						</li>
						<li></li>
					</ul>
				)}
				<h5>devicePositionVector</h5>
				{devicePositionVector && (
					<ul>
						<li>
							x:{" "}
							{getRoundedVectorComponent(devicePositionVector[0])}
						</li>
						<li>
							y:{" "}
							{getRoundedVectorComponent(devicePositionVector[1])}
						</li>
						<li>
							z:{" "}
							{getRoundedVectorComponent(devicePositionVector[2])}
						</li>
						<li></li>
					</ul>
				)}
				<h5>devicePosition</h5>
				{devicePosition && (
					<>
						lat: {devicePosition.latitude}, long:{" "}
						{devicePosition.longitude}
					</>
				)}
			</>
		</>
	);
};
