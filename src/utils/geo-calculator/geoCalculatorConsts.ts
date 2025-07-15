import {
	EGeoCalculatorErrorType,
	EScoreCalculationStrategy,
	IGetVisibilityScoreProps,
	TGetFinalScoreFn,
	TRequiredVisibilityConditionFn,
} from "./geoCalculatorInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import {
	T3DVector,
	TMatrix,
} from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";

const DEFAULT_SATELLITE_ALTITUDE = 408 * 1000;
const EARTH_RADIUS = 6378 * 1000;

export const getErrorMessage = (errorType: EGeoCalculatorErrorType) => {
	return (
		geoCalculatorErrorMessages[errorType] ??
		geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL]
	);
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

	const maxAngleDifferenceDeg = vectorCalculator.getDegreesFromRadians(
		maxAngleDifferenceRad,
	);

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

export const getEnuRotationMatrix_back = (position: IGeoPosition): TMatrix => {
	const lat = vectorCalculator.getRadiansFromDegrees(position.latitude);
	const lon = vectorCalculator.getRadiansFromDegrees(position.longitude);

	const sinLat = Math.sin(lat);
	const cosLat = Math.cos(lat);
	const sinLon = Math.sin(lon);
	const cosLon = Math.cos(lon);

	// Earth rotation matrix from ECEF to ENU
	return [
		[-sinLon, cosLon, 0],
		[-sinLat * cosLon, -sinLat * sinLon, cosLat],
		[cosLat * cosLon, cosLat * sinLon, sinLat],
	];
};

export const getEnuToEcefRotationMatrix = (position: IGeoPosition): TMatrix => {
	const lat = vectorCalculator.getRadiansFromDegrees(position.latitude);
	const lon = vectorCalculator.getRadiansFromDegrees(position.longitude);

	const sinLat = Math.sin(lat);
	const cosLat = Math.cos(lat);
	const sinLon = Math.sin(lon);
	const cosLon = Math.cos(lon);

	return [
		[-sinLon, -sinLat * cosLon, cosLat * cosLon],
		[cosLon, -sinLat * sinLon, cosLat * sinLon],
		[0, cosLat, sinLat],
	];
};

export const getGeoPositionVector = (position: IGeoPosition): T3DVector => {
	const a = 6378137.0; // WGS84 equatorial radius
	const e2 = 6.69437999014e-3; // eccentricity squared

	const lat = vectorCalculator.getRadiansFromDegrees(position.latitude);
	const lon = vectorCalculator.getRadiansFromDegrees(position.longitude);
	const alt = position?.altitude ?? 0;

	const sinLat = Math.sin(lat);
	const cosLat = Math.cos(lat);
	const sinLon = Math.sin(lon);
	const cosLon = Math.cos(lon);

	const N = a / Math.sqrt(1 - e2 * sinLat * sinLat);

	const x = (N + alt) * cosLat * cosLon;
	const y = (N + alt) * cosLat * sinLon;
	const z = (N * (1 - e2) + alt) * sinLat;

	return [x, y, z];
};

export const getGeoPositionFromVector = (vector: T3DVector): IGeoPosition => {
	const [x, y, z] = vector;

	const a = 6378137.0; // WGS84 equatorial radius
	const e2 = 6.69437999014e-3; // eccentricity squared
	const b = a * Math.sqrt(1 - e2); // semi-minor axis

	const ep = Math.sqrt((a ** 2 - b ** 2) / b ** 2);
	const p = Math.sqrt(x * x + y * y);
	const theta = Math.atan2(z * a, p * b);

	const sinTheta = Math.sin(theta);
	const cosTheta = Math.cos(theta);

	const lat = Math.atan2(
		z + ep ** 2 * b * sinTheta ** 3,
		p - e2 * a * cosTheta ** 3,
	);
	const lon = Math.atan2(y, x);

	const sinLat = Math.sin(lat);
	const N = a / Math.sqrt(1 - e2 * sinLat * sinLat);
	const alt = p / Math.cos(lat) - N;

	// Convert radians back to degrees
	const latitude = vectorCalculator.getDegreesFromRadians(lat);
	const longitude = vectorCalculator.getDegreesFromRadians(lon);

	return {
		latitude,
		longitude,
		altitude: alt,
	};
};

const getRandomPosition = (): IGeoPosition => {
	const randomAngle = () => Math.random() * 360 - 180;

	return {
		latitude: randomAngle(),
		longitude: randomAngle(),
	};
};

export const utils = {
	getGeoPositionVector,
	getRandomPosition,
};
