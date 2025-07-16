import { IGeoPosition } from "@common-types/positionTypes";
import { DivIcon, Icon, IconOptions } from "leaflet";

export interface IMarker {
	id: string;
	position: IGeoPosition;
	icon: Icon<IconOptions> | DivIcon;
	tooltip?: string;
}

export interface ILeafletMapProps {
	center?: IGeoPosition;
	markers?: IMarker[];
	zoom?: number;
}
