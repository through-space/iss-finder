import { IGeoPosition } from "../../../types/positionTypes";
import { ISSLocationAPI } from "@services/iss-location/issLocation";

//TODO: change it
export const UPDATE_ISS_POSITION_INTERVAL = 5 * 1000;

export const updateISSLocation = (
	setIssPosition: (position: IGeoPosition) => void,
): void => {
	ISSLocationAPI.getISSLocation().then((data) =>
		setIssPosition({
			latitude: data.latitude,
			longitude: data.longitude,
			altitude: data.altitude,
		}),
	);
};
