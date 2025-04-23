//TODO: add types

import { ISS_LOCATION_API_URL } from "./issLocationConsts";
import { IISSLocationAPI } from "./issLocationInterfaces";
import { IGeoPosition } from "../../types/positionTypes";

const getISSLocation = async (): Promise<IGeoPosition> => {
	return fetch(ISS_LOCATION_API_URL)
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const ISSLocationAPI: IISSLocationAPI = {
	getISSLocation,
};
