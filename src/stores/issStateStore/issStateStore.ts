import { IssState } from "./issStateStoreInterfaces";
import { create } from "zustand/react";
import { IGeoPosition } from "@common-types/positionTypes";
import { getUpdatedPositionsLog } from "./issStateStoreConsts";

export const useIssStateStore = create<IssState>()((set) => {
	return {
		positionsLog: [],
		updateCurrentPosition: (newPosition: IGeoPosition) => {
			set((state) => ({
				...state,
				currentPosition: newPosition,
				positionsLog: getUpdatedPositionsLog(
					state.positionsLog,
					newPosition,
				),
			}));
		},
	};
});
