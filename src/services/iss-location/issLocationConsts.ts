//TODO: extend for other satellites?
import { TStopTrackingFunction } from "@services/device-state/deviceStateServiceInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

const ISS_LOCATION_API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
// const UPDATE_ISS_POSITION_INTERVAL = 5 * 60 * 1000;
const UPDATE_ISS_POSITION_INTERVAL = 5 * 1000;

const getISSLocation = async (): Promise<IGeoPosition> => {
	return fetch(ISS_LOCATION_API_URL)
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			throw err;
		});
};

export const startLocationTracking = (
	onUpdate: (location: IGeoPosition) => void,
): TStopTrackingFunction => {
	const throwError = (err: Error) => {
		console.error(err.message);
		throw err;
	};

	const updateLocation = () =>
		getISSLocation()
			.then((location) => {
				onUpdate(location);
			})
			.catch((err) => {
				throw err;
			});

	updateLocation().catch(throwError);

	const intervalId = setInterval(
		() => updateLocation().catch(throwError),
		UPDATE_ISS_POSITION_INTERVAL,
	);

	return () => {
		clearInterval(intervalId);
	};
};
