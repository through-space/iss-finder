import { IGeoPosition } from "../../../common-types/positionTypes";
import { ReactNode } from "react";

export interface IMapProps {
	center: IGeoPosition;
	markers?: ReactNode;
	zoom?: number;
}
