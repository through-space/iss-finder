import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import React, { FC, useMemo } from "react";
import { LeafletMap } from "@ui-components/molecules/LeafletMap/LeafletMap";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";
import { getMarkers } from "@features/WorldMap/WorldMapConsts";

export const WorldMap: FC = () => {
	const issPosition = useIssStateStore((state) => {
		return state.currentPosition;
	});
	const devicePosition = useDeviceStateStore((state) => state.position);

	/**
	 * TODO: Dev ONLY
	 */
	const deviceDirection = useDeviceStateStore((state) => state.direction);

	const center = useMemo(() => {
		if (!devicePosition) return { latitude: 0, longitude: 0 };
		return {
			latitude: devicePosition.latitude,
			longitude: devicePosition.longitude,
		};
	}, [devicePosition]);

	let devicePointingPosition: IGeoPosition | null = null;

	if (deviceDirection) {
		const deviceDirectionScaled = vectorCalculator.scaleVector(
			deviceDirection,
			1e7,
		);
		const devicePositionVector =
			geoCalculator.getGeoPositionVector(devicePosition);

		const devicePointingVector = vectorCalculator.getVectorsSum(
			devicePositionVector,
			deviceDirectionScaled,
		);

		// console.log(devicePointingVector);
		devicePointingPosition = geoCalculator.getGeoPositionFromVector(
			// vectorCalculator.normalizeVector(devicePointingVector) as T3DVector,
			devicePointingVector as T3DVector,
		);
		// devicePointingPosition = ;
	} else {
		devicePointingPosition = null;
	}

	// console.log("devicePointingPosition", devicePointingPosition);
	/******/

	const markers = useMemo(
		() =>
			getMarkers({
				issPosition,
				devicePosition,
				devicePointingPosition,
			}),
		[devicePosition, issPosition, devicePointingPosition],
	);

	return <LeafletMap center={center} zoom={5} markers={markers} />;
};
