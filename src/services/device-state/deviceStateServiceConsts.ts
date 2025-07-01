import {
	IDeviceOrientation,
	IDeviceOrientationEventiOS,
	TDeviceAngle,
	TStopTrackingFunction,
} from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import {
	EAxis,
	T3DVector,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { NULL_3D_VECTOR } from "@utils/vector-calculator/vectorCalculatorConsts";

const UPDATE_DEVICE_POSITION_INTERVAL = 10 * 30 * 1000;

const getIsIOS = (): boolean => {
	return !!(DeviceOrientationEvent as unknown as IDeviceOrientationEventiOS)
		.requestPermission;
};

export const getLocation = (): Promise<IGeoPosition> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
			// console.log(position);
			resolve(position.coords);
		}, reject);
	});
};

export const startLocationTracking = (
	onUpdate: (location: IGeoPosition) => void,
): TStopTrackingFunction => {
	const throwError = (error: Error) => {
		throw error;
	};

	const updateLocation = () =>
		getLocation()
			.then((location) => {
				console.log(JSON.stringify(location));
				onUpdate(location);
			})
			.catch(throwError);

	updateLocation().catch(throwError);

	const intervalId = setInterval(
		() => updateLocation().catch(throwError),
		UPDATE_DEVICE_POSITION_INTERVAL,
	);

	return () => {
		clearInterval(intervalId);
	};
};

export const startOrientationTracking = (
	onUpdate: (orientation: DeviceOrientationEvent) => void,
): TStopTrackingFunction => {
	if (getIsIOS()) {
		(DeviceOrientationEvent as unknown as IDeviceOrientationEventiOS)
			.requestPermission()
			.then((response) => {
				if (response === "granted") {
					window.addEventListener(
						"deviceorientation",
						onUpdate,
						true,
					);
				} else {
					alert("has to be allowed!");
				}
			})
			.catch(() => alert("not supported"));
	} else {
		window.addEventListener(
			// TODO: "deviceorientation" vs "deviceorientationabsolute"
			// "deviceorientationabsolute",

			"deviceorientation",
			(e) => onUpdate(e),
			true,
		);
	}

	return () => {
		window.removeEventListener("deviceorientation", onUpdate, true);
		window.removeEventListener("deviceorientationabsolute", onUpdate, true);
	};
};

export const orientationRotationMap: Record<TDeviceAngle, EAxis> = {
	alpha: EAxis.X,
	beta: EAxis.Y,
	gamma: EAxis.Z,
};

export const getCameraDirection = (props: {
	position: IGeoPosition;
	prevOrientation: IDeviceOrientation;
	newOrientation: IDeviceOrientation;
}): T3DVector => {
	const { prevOrientation, newOrientation, position } = props;

	if (!position || !newOrientation) {
		return NULL_3D_VECTOR;
	}

	let resultDirection = vectorCalculator.vectorToMatrix(
		geoCalculator.getPositionVector(position),
	);

	Object.keys(orientationRotationMap).map((angleName: TDeviceAngle) => {
		if (
			!prevOrientation ||
			prevOrientation[angleName] !== newOrientation[angleName]
		) {
			const rotationAxis = orientationRotationMap[angleName];
			console.log(rotationAxis);
			const rotationMatrix = vectorCalculator.getRotationMatrix(
				rotationAxis,
				vectorCalculator.getRadiansFromDegrees(
					newOrientation[angleName],
				),
			);

			resultDirection = vectorCalculator.multiplyMatrices(
				rotationMatrix,
				resultDirection,
			);
		}
	});

	return vectorCalculator.matrixToVector3D(resultDirection);
};
