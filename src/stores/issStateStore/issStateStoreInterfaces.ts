import { IGeoPosition } from "../../types/positionTypes";

export interface IPositionsLogItem {
	position: IGeoPosition;
	timestamp: number;
}

export interface IssState {
	currentPosition?: IGeoPosition;
	positionsLog: IPositionsLogItem[];
	updateCurrentPosition: (position: IGeoPosition) => void;
}
