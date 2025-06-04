import { create } from "zustand/react";
import { IGeoPosition } from "../../common-types/positionTypes";
import { IDeviceStateStore } from "@stores/deviceStateStore/deviceStateStoreInterfaces";

export const useWeatherConditionsStateStore = create<IDeviceStateStore>()((
	set,
) => {
	return {
		position: null,
		updateCurrentPosition: (newPosition: IGeoPosition) => {
			set(() => ({
				position: newPosition,
			}));
		},
	};
});
