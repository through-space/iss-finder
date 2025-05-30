import { IGeoPosition } from "@common-types/positionTypes";
import { geoCalculatorErrorMessages } from "../../geoCalculatorConsts";
import { EGeoCalculatorErrorType } from "../../geoCalculatorInterfaces";

export const getGeoPositionFromGMapsFormat = (
	positionStr: string,
): IGeoPosition => {
	const throwError = (errorType: EGeoCalculatorErrorType) => {
		throw new Error(geoCalculatorErrorMessages[errorType]);
	};

	if (!positionStr) {
		throwError(EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT);
	}

	const parts = positionStr.split(",");

	if (parts.length !== 2) {
		throwError(EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT);
	}

	const [latitude, longitude] = parts
		.map((s) => s.trim())
		.map((degreeStr) => parseFloat(degreeStr))
		.map((degree) => {
			if (isNaN(degree)) {
				throwError(EGeoCalculatorErrorType.CONVERSION_INVALID_ANGLE);
			}

			const absDegree = Math.abs(degree);
			if (absDegree < 0 || absDegree > 180) {
				throwError(
					EGeoCalculatorErrorType.CONVERSION_OUT_OF_BOUNDS_ANGLE,
				);
			}

			return degree;
		});

	return {
		latitude,
		longitude,
	};
};

export const getRandomPosition = (): IGeoPosition => {
	const randomAngle = () => Math.random() * 360 - 180;

	return {
		latitude: randomAngle(),
		longitude: randomAngle(),
	};
};

export const getOppositeAngle = (degrees: number): number => {
	return ((degrees + 360) % 360) - 180;
};
