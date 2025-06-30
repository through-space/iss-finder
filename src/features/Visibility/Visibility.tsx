import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { useEffect, useMemo, useState } from "react";
import { daytimeService } from "@services/daytime/daytimeService";
import { TRequiredVisibilityConditionFn } from "@utils/geo-calculator/geoCalculatorInterfaces";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { isSatelliteAbove } from "@utils/geo-calculator/geoCalculatorConsts";

export const Visibility = () => {
	//TODO: prevent multiple rendering
	console.log("rendering Visibility component");
	const [isDaytime, setIsDaytime] = useState<boolean>(false);

	const satellitePosition = useIssStateStore(
		(state) => state.currentPosition,
	);

	const devicePosition = useDeviceStateStore((state) => state.position);

	const requiredConditions: TRequiredVisibilityConditionFn[] = useMemo(
		() => [() => !isDaytime, isSatelliteAbove],
		[isDaytime, isSatelliteAbove],
	);

	useEffect(() => {
		if (devicePosition) {
			daytimeService
				.isDaytime({
					currentTimestamp: new Date().getTime() / 1000,
					location: devicePosition,
				})
				.then((isDaytimeNew) => {
					if (isDaytime !== isDaytimeNew) {
						setIsDaytime(isDaytimeNew);
					}
				});
		}
	}, [devicePosition]);

	const visibilityScore = geoCalculator.getVisibilityScore({
		devicePosition,
		satellitePosition,
		requiredConditions,
	});

	return (
		<div>
			<div>visibilityScore</div>
			<div>{visibilityScore}</div>
		</div>
	);
};
