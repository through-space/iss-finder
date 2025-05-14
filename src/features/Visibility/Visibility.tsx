import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";

export const Visibility = () => {
	const satellitePosition = useIssStateStore(
		(state) => state.currentPosition,
	);
	const devicePosition = useDeviceStateStore((state) => state.position);

	const visibilityScore = geoCalculator.getVisibilityScore({
		devicePosition,
		satellitePosition,
		requiredConditions: [],
	});

	return (
		<div>
			<div>visibilityScore</div>
			<div>{visibilityScore}</div>
		</div>
	);
};
