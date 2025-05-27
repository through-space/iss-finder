import {
	EIsDaytimeCalculationStrategy,
	IGetByTotalDarknessProps,
	TIsDaytimeCalculationProps,
	TIsDaytimeCalculationStrategy,
} from "@services/daytime/daytimeServiceInterfaces";
import { getTimeStampFromAPIDate } from "@services/daytime/helpers";

const getIsDaytimeByTotalDarkness: TIsDaytimeCalculationStrategy<
	IGetByTotalDarknessProps
> = ({ timestamp, apiResponse: { utc_offset, date, sunrise, sunset } }) => {
	// TODO: would be great to change it to score: f(time) => darkness level

	const sunriseTime = getTimeStampFromAPIDate(date, utc_offset, sunrise);
	const sunsetTime = getTimeStampFromAPIDate(date, utc_offset, sunset);

	return timestamp >= sunriseTime && timestamp <= sunsetTime;
};

export const isDaytimeCalcStrategies: Record<
	EIsDaytimeCalculationStrategy,
	TIsDaytimeCalculationStrategy<TIsDaytimeCalculationProps>
> = {
	[EIsDaytimeCalculationStrategy.BY_TOTAL_DARKNESS]:
		getIsDaytimeByTotalDarkness,
	[EIsDaytimeCalculationStrategy.BY_FIRST_LIGHT]: (props) => false,
};
