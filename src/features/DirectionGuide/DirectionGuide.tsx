import { FC } from "react";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";

export const DirectionGuide: FC = () => {
	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	const deviceDirection = useDeviceStateStore((state) => state.direction);

	const getRoundedDirection = (angle: number) => {
		const roundFactor = Math.pow(10, 3);
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
				{deviceDirection && (
					<ul>
						<li>x: {getRoundedDirection(deviceDirection[0])}</li>
						<li>y: {getRoundedDirection(deviceDirection[1])}</li>
						<li>z: {getRoundedDirection(deviceDirection[2])}</li>
					</ul>
				)}
			</>
		</>
	);
};
