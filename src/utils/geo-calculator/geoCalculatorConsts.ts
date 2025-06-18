import {
	EGeoCalculatorErrorType,
	EScoreCalculationStrategy,
	IGetVisibilityScoreProps,
	TGetFinalScoreFn,
	TRequiredVisibilityConditionFn,
} from "./geoCalculatorInterfaces";
import { IGeoPosition, IPositionVector } from "@common-types/positionTypes";

const DEFAULT_SATELLITE_ALTITUDE = 408 * 1000;
const EARTH_RADIUS = 6378 * 1000;

export const getErrorMessage = (errorType: EGeoCalculatorErrorType) => {
	return (
		geoCalculatorErrorMessages[errorType] ??
		geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL]
	);
};

// TODO: check negative values
const getDegreesFromRadians = (radians: number) => {
	return ((180 / Math.PI) * radians) % 360;
};

// TODO: check negative values
const getRadiansFromDegrees = (degrees: number) => {
	const normalizedDegrees = degrees % 360;
	return (normalizedDegrees * Math.PI) / 180;
};

const getAngleDifference = (a: number, b: number): number => {
	let diff = a - b;
	if (diff > 180) diff -= 360;
	if (diff < -180) diff += 360;
	return Math.abs(diff);
};

export const getAverageWeightScore: TGetFinalScoreFn = ({
	scoreComponents,
	devicePosition,
	satellitePosition,
}) => {
	const totalWeight = scoreComponents.reduce(
		(sum, scoreComponent) => sum + scoreComponent.weight,
		0,
	);

	return scoreComponents.reduce((finalScore, scoreComponent) => {
		const score = scoreComponent.getScore({
			devicePosition,
			satellitePosition,
		});
		const averageWeight = scoreComponent.weight / totalWeight;

		return finalScore + score * averageWeight;
	}, 0);
};

export const calculationStrategiesMap: Record<
	EScoreCalculationStrategy,
	TGetFinalScoreFn
> = {
	[EScoreCalculationStrategy.WEIGHTED_AVERAGE]: getAverageWeightScore,
};

export const isSatelliteAbove: TRequiredVisibilityConditionFn = ({
	devicePosition,
	satellitePosition,
}) => {
	const satelliteAltitude = satellitePosition.altitude
		? satellitePosition.altitude * 1000
		: DEFAULT_SATELLITE_ALTITUDE;

	// ToDo: Currently device altitude = 0
	const maxAngleDifferenceRad = Math.acos(
		EARTH_RADIUS / (EARTH_RADIUS + satelliteAltitude),
	);

	const maxAngleDifferenceDeg = getDegreesFromRadians(maxAngleDifferenceRad);

	const latAngleDifference = getAngleDifference(
		devicePosition.latitude,
		satellitePosition.latitude,
	);
	const lonAngleDifference = getAngleDifference(
		devicePosition.longitude,
		satellitePosition.longitude,
	);

	return (
		latAngleDifference < maxAngleDifferenceDeg &&
		lonAngleDifference < maxAngleDifferenceDeg
	);
};

export const getVisibilityScore = ({
	devicePosition,
	satellitePosition,
	requiredConditions,
	scoreComponents,
	calculationStrategy,
}: IGetVisibilityScoreProps): number => {
	if (!devicePosition || !satellitePosition) {
		return 0;
	}

	const meetsRequiredConditions = requiredConditions.every((conditionFn) =>
		conditionFn({ devicePosition, satellitePosition }),
	);

	if (!meetsRequiredConditions) {
		return 0;
	}

	if (!scoreComponents || scoreComponents.length === 0) {
		return 1;
	}

	const getFinalScore = calculationStrategiesMap[calculationStrategy];

	return getFinalScore({
		devicePosition,
		scoreComponents,
		satellitePosition,
	});
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

const getPositionVector = (position: IGeoPosition): IPositionVector => {
	const latitudeRadians = getRadiansFromDegrees(position.latitude);
	const longitudeRadians = getRadiansFromDegrees(position.longitude);

	// const radius = EARTH_RADIUS + (position.altitude ?? 0);

	// const xyPlaneProjectionLength = Math.cos(latitudeRadians);

	return {
		x: Math.cos(longitudeRadians) * Math.cos(latitudeRadians),
		y: Math.sin(longitudeRadians) * Math.cos(latitudeRadians),
		z: Math.sin(latitudeRadians),
	};
};

export const getViewDirectionVector = (
	point1: IPositionVector,
	point2: IPositionVector,
) => {
	return getVectorsSum(point2, getOppositeVector(point1));
};

// const

export const utils = {
	getDegreesFromRadians,
	getRadiansFromDegrees,
	getPositionVector,
};
