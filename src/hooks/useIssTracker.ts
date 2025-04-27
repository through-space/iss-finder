import { useEffect, useRef } from "react";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { ISSLocationAPI } from "@services/iss-location/issLocation";
import { IGeoPosition } from "@common-types/positionTypes";
//TODO: change it
const UPDATE_ISS_POSITION_INTERVAL = 5 * 1000;

export const useIssTracker = () => {
	const intervalRef = useRef<NodeJS.Timeout>(null);

	const updateCurrentPosition = useIssStateStore(
		(state) => state.updateCurrentPosition,
	);

	const updateISSLocation = () => {
		ISSLocationAPI.getISSLocation().then((location: IGeoPosition) => {
			updateCurrentPosition(location);
		});
	};

	useEffect(() => {
		updateISSLocation();

		intervalRef.current = setInterval(() => {
			updateISSLocation();
		}, UPDATE_ISS_POSITION_INTERVAL);

		return () => {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		};
	}, [updateCurrentPosition]);
};
