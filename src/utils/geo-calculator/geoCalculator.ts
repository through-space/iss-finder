import { IGeoCalculator } from "./geoCalculatorInterfaces";
import {
	getEnuToEcefRotationMatrix,
	getErrorMessage,
	getGeoPositionFromVector,
	getGeoPositionVector,
	getVisibilityScore,
} from "./geoCalculatorConsts";

export const geoCalculator: IGeoCalculator = {
	getGeoPositionVector,
	getGeoPositionFromVector,
	getVisibilityScore,
	getEnuToEcefRotationMatrix,
	// getEnuRotationMatrix,
	getErrorMessage,
};
