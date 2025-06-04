import { IPositionsLogItem } from "./issStateStoreInterfaces";
import { IGeoPosition } from "../../common-types/positionTypes";

// export const updateCurrentPosition = (position: IGeoPosition) => {};

// export const DEFAULT_ISS_STATE: IssState = {
// 	updateCurrentPosition: (position: IGeoPosition) => {},
// };

//TODO: move to config
const maxHistoricalPositions = 10;

export const getUpdatedPositionsLog = (
	prevLogItems: IPositionsLogItem[],
	newPosition: IGeoPosition,
): IPositionsLogItem[] => {
	return [
		...prevLogItems,
		{ position: newPosition, timestamp: Date.now() },
	].slice(-maxHistoricalPositions);
};
