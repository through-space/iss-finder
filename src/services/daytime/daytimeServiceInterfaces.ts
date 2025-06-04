import { IGeoPosition } from "../../common-types/positionTypes";

/**
 * DaytimeService
 */

export interface IIsDaytimeProps {
	currentTimestamp: number;
	location: IGeoPosition;
	strategy?: EIsDaytimeCalculationStrategy;
}

export interface IDaytimeService {
	isDaytime: (props: IIsDaytimeProps) => Promise<boolean>;
}

export enum EDaytimeServiceError {
	NO_LOCATION,
	FETCH_ERROR,
}

export interface IDaytimeServiceResponse {
	date: string;
	dawn: string;
	day_length: string;
	dusk: string;
	first_light: string;
	golden_hour: string;
	last_light: string;
	solar_noon: string;
	sunrise: string;
	sunset: string;
	timezone: string;
	utc_offset: number;
}

/**
 * Calculations
 */

export enum EIsDaytimeCalculationStrategy {
	BY_TOTAL_DARKNESS,
	BY_FIRST_LIGHT,
}

export interface IIsDaytimeCalculationProps {
	timestamp: number;
	apiResponse: Pick<IDaytimeServiceResponse, "utc_offset" | "date">;
}

export interface IGetByTotalDarknessProps extends IIsDaytimeCalculationProps {
	timestamp: number;
	apiResponse: Pick<
		IDaytimeServiceResponse,
		"utc_offset" | "date" | "sunrise" | "sunset"
	>;
}

export interface IGetByTotalFirstLightProps extends IIsDaytimeCalculationProps {
	timestamp: number;
	apiResponse: Pick<
		IDaytimeServiceResponse,
		"utc_offset" | "date" | "sunrise" | "sunset"
	>;
}

export type TIsDaytimeCalculationProps =
	| IGetByTotalDarknessProps
	| IGetByTotalFirstLightProps;

export type TIsDaytimeCalculationStrategy<
	T extends TIsDaytimeCalculationProps,
> = (props: T) => boolean;
