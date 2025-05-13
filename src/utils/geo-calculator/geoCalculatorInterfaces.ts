import { IGeoPosition } from "@common-types/positionTypes";

export interface IGeoCalculator {
	getVisibilityScore: (props: IGetVisibilityScoreProps) => number;
	getErrorMessage: (errorType: EGeoCalculatorErrorType) => string | null;
}

export enum EGeoCalculatorErrorType {
	GENERAL,

	SAME_HEMISPHERE,
	SAME_HEMISPHERE_POSITION_MISSING,

	CONVERSION_WRONG_INPUT,
	CONVERSION_INVALID_ANGLE,
	CONVERSION_OUT_OF_BOUNDS_ANGLE,
}

export type TGetVisibilityScoreFn = (props: {
	devicePosition?: IGeoPosition;
	satellitePosition?: IGeoPosition;
}) => number;

export type TRequiredVisibilityConditionFn = (props: {
	devicePosition?: IGeoPosition;
	satellitePosition?: IGeoPosition;
}) => boolean;

export enum EScoreCalculationStrategy {
	WEIGHTED_AVERAGE,
}

export interface IScoreComponent {
	weight?: number;
	getScore: TGetVisibilityScoreFn;
}

export type TGetFinalScoreFn = (props: {
	scoreComponents: IScoreComponent[];
	devicePosition: IGeoPosition;
	satellitePosition: IGeoPosition;
}) => number;

export interface IGetVisibilityScoreProps {
	devicePosition?: IGeoPosition;
	satellitePosition?: IGeoPosition;
	requiredConditions?: TRequiredVisibilityConditionFn[];
	scoreComponents?: IScoreComponent[];
	calculationStrategy?: EScoreCalculationStrategy;
}
