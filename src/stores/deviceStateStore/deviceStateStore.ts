import { create } from "zustand/react";
import { IDeviceStateStore } from "@stores/deviceStateStore/deviceStateStoreInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";

export const useDeviceStateStore = create<IDeviceStateStore>()((set) => {
	return {
		position: null,
		orientation: null,
		updateCurrentPosition: (newPosition: IGeoPosition) => {
			set(() => ({
				position: newPosition,
			}));
		},
		updateOrientation: (newOrientation: IDeviceOrientation) => {
			set(() => ({ orientation: newOrientation }));
		},
	};
});
