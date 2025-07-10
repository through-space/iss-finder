import { IGeoCalculator } from "./geoCalculatorInterfaces";
import {
	getEnuToEcefRotationMatrix,
	getErrorMessage,
	getGeoPositionVector,
	getVisibilityScore,
} from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	getGeoPositionVector,
	getVisibilityScore,
	getEnuToEcefRotationMatrix,
	// getEnuRotationMatrix,
	getErrorMessage,
};
