import { IGeoPosition } from "../../common-types/positionTypes";

export interface IPositionsLogItem {
	position: IGeoPosition;
	timestamp: number;
}

export interface IssState {
	currentPosition?: IGeoPosition;
}

export interface IIssCurrentPositionSlice {
	currentPosition?: IGeoPosition;
	updateCurrentPosition: (position: IGeoPosition) => void;
}

export interface IIssPositionsLogSlice {
	positionsLog: IPositionsLogItem[];
	updatePositionsLog: (newPosition: IGeoPosition) => void;
}

// TODO: Do slice really prevent loading Log each time?
