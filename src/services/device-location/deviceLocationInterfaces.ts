import { IGeoPosition } from "@common-types/positionTypes";

export interface IDeviceLocationService {
	getDeviceLocation: () => Promise<IGeoPosition>;
}
