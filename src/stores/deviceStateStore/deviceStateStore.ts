import { create } from "zustand/react";
import { IGeoPosition } from "@common-types/positionTypes";
import { IDeviceStateStore } from "@stores/deviceStateStore/deviceStateStoreInterfaces";

export const useDeviceStateStore = create<IDeviceStateStore>()((set) => {
	return {
		position: null,
		updateCurrentPosition: (newPosition: IGeoPosition) => {
			set(() => ({
				position: newPosition,
			}));
		},
	};
});
