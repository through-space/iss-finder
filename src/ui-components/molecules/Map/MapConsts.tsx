import { IMapProps } from "./MapInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

const DEFAULT_MAP_CENTER: IGeoPosition = {
	latitude: 0,
	longitude: 0,
};

export const DEFAULT_MAP_PROPS: IMapProps = {
	center: DEFAULT_MAP_CENTER,
	zoom: 1,
};
