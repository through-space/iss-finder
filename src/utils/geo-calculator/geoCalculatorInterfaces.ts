import { IGeoPosition } from "@common-types/positionTypes";

export interface IGeoCalculator {
	isSatelliteVisible: (
		devicePosition: IGeoPosition,
		satellitePosition: IGeoPosition,
	) => boolean;
	getErrorMessage: (errorType: EGeoCalculatorErrorType) => string | null;
}

export enum EGeoCalculatorErrorType {
	CONVERSION_WRONG_INPUT,
	CONVERSION_INVALID_ANGLE,
	OUT_OF_BOUNDS_ANGLE,
}
