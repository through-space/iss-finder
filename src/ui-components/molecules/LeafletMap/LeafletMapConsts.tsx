import { ILeafletMapProps } from "./LeafletMapInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

const DEFAULT_MAP_CENTER: IGeoPosition = {
	latitude: 0,
	longitude: 0,
};

export const DEFAULT_MAP_PROPS: ILeafletMapProps = {
	center: DEFAULT_MAP_CENTER,
	zoom: 1,
	markers: [],
};
