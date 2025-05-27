import {
	EDaytimeServiceError,
	EIsDaytimeCalculationStrategy,
	IDaytimeServiceResponse,
	IIsDaytimeProps,
} from "@services/daytime/daytimeServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import { getTimeStampFromAPIDate } from "@services/daytime/helpers";
import { isDaytimeCalcStrategies } from "@services/daytime/calculationStrategies";

const DAYTIME_PROVIDER_URL = "https://api.sunrisesunset.io/json";

const DEFAULT_IS_DATETIME_STRATEGY =
	EIsDaytimeCalculationStrategy.BY_TOTAL_DARKNESS;

export const daytimeServiceErrorMessages: Record<EDaytimeServiceError, string> =
	{
		[EDaytimeServiceError.NO_LOCATION]: "No Location Provided",
		[EDaytimeServiceError.FETCH_ERROR]: "Fetch Daytime Error",
	};

// TODO: add test

const isValidLocation = (location: IGeoPosition): boolean => {
	return (
		location.longitude <= 180 &&
		location.longitude >= -180 &&
		location.latitude <= 180 &&
		location.latitude >= -180
	);
};

const getDaytimeData = async (
	location: IGeoPosition,
): Promise<IDaytimeServiceResponse> => {
	if (!location || !isValidLocation(location)) {
		throw new Error(
			daytimeServiceErrorMessages[EDaytimeServiceError.NO_LOCATION],
		);
	}

	const queryStr = new URLSearchParams({
		lat: location.latitude.toString(),
		lng: location.longitude.toString(),
	}).toString();

	const url = `${DAYTIME_PROVIDER_URL}?${queryStr}`;

	return fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.status !== "OK") {
				throw new Error(
					daytimeServiceErrorMessages[
						EDaytimeServiceError.FETCH_ERROR
					],
				);
			}

			return data.results;
		})
		.then((data) => {
			return data;
		})
		.catch(() => {
			throw new Error(
				daytimeServiceErrorMessages[EDaytimeServiceError.FETCH_ERROR],
			);
		});
};

export const isDaytime = async (props: IIsDaytimeProps): Promise<boolean> => {
	const {
		location,
		currentTimestamp,
		strategy = DEFAULT_IS_DATETIME_STRATEGY,
	} = props;

	const getIsDaytime =
		isDaytimeCalcStrategies[strategy] ??
		isDaytimeCalcStrategies[DEFAULT_IS_DATETIME_STRATEGY];

	return getDaytimeData(location)
		.then((data) =>
			getIsDaytime({
				timestamp: currentTimestamp,
				apiResponse: data,
			}),
		)
		.catch((err) => err);
};

export const utils = {
	getTimeStampFromAPIDate,
	getDaytimeData,
};
