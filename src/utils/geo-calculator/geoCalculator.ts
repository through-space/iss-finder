import { IGeoCalculator } from "./geoCalculatorInterfaces";
import { isSatelliteVisible } from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	isSatelliteVisible,
	getErrorMessage,
};
