import { IGeoCalculator } from "./geoCalculatorInterfaces";
import { getErrorMessage, isSatelliteVisible } from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	isSatelliteVisible,
	getErrorMessage,
};
