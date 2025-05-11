import { IGeoPosition } from "@common-types/positionTypes";
import { EGeoCalculatorErrorType } from "./geoCalculatorInterfaces";

export const getErrorMessage = (errorType: EGeoCalculatorErrorType) => {
	return (
		geoCalculatorErrorMessages[errorType] ??
		geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL]
	);
};

export const isOnSameHemisphere = (
	position1: IGeoPosition,
	position2: IGeoPosition,
): boolean => {
	if (!position1 || !position2) {
		throw new Error(
			geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL],
		);
	}

	return (
		Math.abs(position1.latitude - position2.latitude) < 90 &&
		Math.abs(position1.longitude - position2.longitude) < 90
	);
};

export const isSatelliteVisible = (
	devicePosition: IGeoPosition,
	satellitePosition: IGeoPosition,
): boolean => {
	return false;
};

export const geoCalculatorErrorMessages: Record<
	EGeoCalculatorErrorType,
	string
> = {
	[EGeoCalculatorErrorType.GENERAL]: "GeoCalculator Error",
	[EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT]:
		"Format Conversion WRONG_INPUT",
	[EGeoCalculatorErrorType.CONVERSION_INVALID_ANGLE]:
		"Format Conversion Invalid Angle",
	[EGeoCalculatorErrorType.CONVERSION_OUT_OF_BOUNDS_ANGLE]:
		"Angle Must be in range [-180, 180]",
	[EGeoCalculatorErrorType.SAME_HEMISPHERE]:
		"isSameHemisphere() Calculation Error",
	[EGeoCalculatorErrorType.SAME_HEMISPHERE_POSITION_MISSING]:
		"isSameHemisphere() Position is missing",
};
