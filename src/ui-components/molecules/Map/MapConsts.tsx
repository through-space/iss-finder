import { IGeoPosition } from "@common-types/positionTypes";
import { IMapProps } from "./MapInterfaces";

const DEFAULT_MAP_CENTER: IGeoPosition = {
	latitude: 51.505,
	longitude: -0.09,
};

export const DEFAULT_MAP_PROPS: IMapProps = {
	center: DEFAULT_MAP_CENTER,
	zoom: 1,
};
