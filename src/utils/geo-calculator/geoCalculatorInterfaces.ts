import { IGeoPosition } from "@common-types/positionTypes";

export interface IGeoCalculator {
	isSatelliteVisible: (
		devicePosition: IGeoPosition,
		satellitePosition: IGeoPosition,
	) => boolean;
	getErrorMessage: (errorType: EGeoCalculatorErrorType) => string | null;
}

export enum EGeoCalculatorErrorType {
	GENERAL,

	SAME_HEMISPHERE,
	SAME_HEMISPHERE_POSITION_MISSING,

	CONVERSION_WRONG_INPUT,
	CONVERSION_INVALID_ANGLE,
	CONVERSION_OUT_OF_BOUNDS_ANGLE,
}
