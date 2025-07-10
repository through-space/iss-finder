import {
	IDeviceOrientation,
	IDeviceOrientationEventiOS,
	TStopTrackingFunction,
} from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import {
	EAxis,
	T3DVector,
	TMatrix,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";
import { NULL_3D_VECTOR } from "@utils/vector-calculator/vectorCalculatorConsts";
import { getEnuToEcefRotationMatrix } from "@utils/geo-calculator/geoCalculatorConsts";
import { multiplyMatrices } from "@utils/vector-calculator/operations/matrix";

const UPDATE_DEVICE_POSITION_INTERVAL = 10 * 30 * 1000;

const getIsIOS = (): boolean => {
	return !!(DeviceOrientationEvent as unknown as IDeviceOrientationEventiOS)
		.requestPermission;
};

export const getLocation = (): Promise<IGeoPosition> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition((position) => {
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

/**
 * By GPT
 */
export const orientationRotationMap: Record<string, EAxis> = {
	alpha: EAxis.Z,
	beta: EAxis.X,
	gamma: EAxis.Y,
};

const rotationAngleOrder = ["alpha", "beta", "gamma"];

const getRotationMatrix = (orientation: IDeviceOrientation): TMatrix => {
	let rotationMatrix = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	];

	rotationAngleOrder.map((angleName) => {
		rotationMatrix = vectorCalculator.multiplyMatrices(
			rotationMatrix,
			vectorCalculator.getRotationMatrix(
				orientationRotationMap[angleName],
				vectorCalculator.getRadiansFromDegrees(orientation[angleName]),
			),
		);
	});

	return rotationMatrix;
};

export const getCameraDirection = (props: {
	orientation: IDeviceOrientation;
	position: IGeoPosition;
}): T3DVector => {
	const { position, orientation } = props;

	if (!orientation) {
		return NULL_3D_VECTOR;
	}

	const rotationMatrix = getRotationMatrix(orientation);

	const forward = [0, 0, -1];

	const directionMatrix = vectorCalculator.multiplyMatrices(
		rotationMatrix,
		vectorCalculator.vectorToMatrix(forward),
	);

	const positionMatrix = vectorCalculator.multiplyMatrices(
		getEnuToEcefRotationMatrix(position),
		directionMatrix,
	);

	return vectorCalculator.matrixToVector3D(
		position ? positionMatrix : directionMatrix,
	);
};
