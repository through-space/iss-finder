import {
	IIssCurrentPositionSlice,
	IIssPositionsLogSlice,
} from "./issStateStoreInterfaces";
import { create } from "zustand/react";
import { IGeoPosition } from "@common-types/positionTypes";
import { getUpdatedPositionsLog } from "./issStateStoreConsts";
import { StateCreator } from "zustand/index";

const createIssCurrentPositionSlice: StateCreator<
	IIssCurrentPositionSlice & IIssPositionsLogSlice,
	[],
	[],
	IIssCurrentPositionSlice
> = (set) => ({
	updateCurrentPosition: (newPosition: IGeoPosition) => {
		set({ currentPosition: newPosition });
	},
});

const createIssPositionLogSlice: StateCreator<
	IIssCurrentPositionSlice & IIssPositionsLogSlice,
	[],
	[],
	IIssPositionsLogSlice
> = (set) => ({
	positionsLog: [],
	updatePositionsLog: (newPosition) => {
		set((state) => ({
			positionsLog: getUpdatedPositionsLog(
				state.positionsLog,
				newPosition,
			),
		}));
	},
});
export const useIssStateStore = create<
	IIssCurrentPositionSlice & IIssPositionsLogSlice
>()((...a) => ({
	...createIssCurrentPositionSlice(...a),
	...createIssPositionLogSlice(...a),
}));
