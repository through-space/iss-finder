import { IGeoCalculator } from "./geoCalculatorInterfaces";
import { getErrorMessage, getVisibilityScore } from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	getVisibilityScore,
	getErrorMessage,
};
