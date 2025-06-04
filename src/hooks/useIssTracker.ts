import { useEffect } from "react";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { ISSLocationService } from "@services/iss-location/issLocation";

export const useIssTracker = () => {
	const storeLocation = useIssStateStore(
		(state) => state.updateCurrentPosition,
	);

	useEffect(() => {
		const stopLocationTracking =
			ISSLocationService.startLocationTracking(storeLocation);
		return () => {
			stopLocationTracking();
		};
	}, [storeLocation]);
};
