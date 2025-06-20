import { IGeoCalculator } from "./geoCalculatorInterfaces";
import {
	getErrorMessage,
	getPositionVector,
	getVisibilityScore,
} from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	getPositionVector,
	getVisibilityScore,
	getErrorMessage,
};
