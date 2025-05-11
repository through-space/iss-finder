import { IGeoPosition } from "@common-types/positionTypes";
import { EGeoCalculatorErrorType } from "./geoCalculatorInterfaces";

export const getErrorMessage = () => {};

const isOnSameHemisphere = (
	position1: IGeoPosition,
	position2: IGeoPosition,
): boolean => {
	if (!position1 || !position2) {
		return false;
	}
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
	[EGeoCalculatorErrorType.CONVERSION_WRONG_INPUT]:
		"Format Conversion WRONG_INPUT",
	[EGeoCalculatorErrorType.CONVERSION_INVALID_ANGLE]:
		"Format Conversion Invalid Angle",
	[EGeoCalculatorErrorType.OUT_OF_BOUNDS_ANGLE]:
		"Angle Must be in range [-180, 180]",
};
