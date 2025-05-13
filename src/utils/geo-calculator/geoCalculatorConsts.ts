import {
	EGeoCalculatorErrorType,
	EScoreCalculationStrategy,
	IGetVisibilityScoreProps,
	TGetFinalScoreFn,
	TRequiredVisibilityConditionFn,
} from "./geoCalculatorInterfaces";

export const getErrorMessage = (errorType: EGeoCalculatorErrorType) => {
	return (
		geoCalculatorErrorMessages[errorType] ??
		geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL]
	);
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

export const isOnSameHemisphere: TRequiredVisibilityConditionFn = ({
	devicePosition,
	satellitePosition,
}) => {
	if (!devicePosition || !satellitePosition) {
		throw new Error(
			geoCalculatorErrorMessages[EGeoCalculatorErrorType.GENERAL],
		);
	}

	return (
		Math.abs(devicePosition.latitude - satellitePosition.latitude) < 90 &&
		Math.abs(devicePosition.longitude - satellitePosition.longitude) < 90
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
