import { create } from "zustand/react";
import { IDeviceStateStore } from "@stores/deviceStateStore/deviceStateStoreInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";

export const useDeviceStateStore = create<IDeviceStateStore>()((set) => {
	console.log("building this object from scratch each time?");
	return {
		// position: null,
		// orientation: null,
		updatePosition: (newPosition: IGeoPosition) => {
			set(() => ({
				position: newPosition,
			}));
		},
		updateOrientation: (newOrientation: IDeviceOrientation) => {
			set(() => ({ orientation: newOrientation }));
		},
		updateDirection: (newDirection: T3DVector) => {
			set(() => ({ direction: newDirection }));
		},
	};
});
