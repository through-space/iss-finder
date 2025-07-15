import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { Marker, Popup } from "react-leaflet";
import {
	CrossHairIcon,
	DeviceIcon,
	ISSIcon,
} from "@ui-components/atoms/MapComponents/ISSIcons";
import React from "react";
import { Map } from "@ui-components/molecules/Map/Map";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";
import { vectorCalculator } from "@utils/vector-calculator/vectorCalculator";
import { T3DVector } from "@utils/vector-calculator/vectorCalculatorInterfaces";
import { IGeoPosition } from "@common-types/positionTypes";

export const WorldMap = () => {
	const issPosition = useIssStateStore((state) => {
		return state.currentPosition;
	});
	const devicePosition = useDeviceStateStore((state) => state.position);

	/**
	 * TODO: Dev ONLY
	 */
	const deviceDirection = useDeviceStateStore((state) => state.direction);

	let devicePointingPosition: IGeoPosition | null = null;
	if (deviceDirection) {
		const deviceDirectionScaled = vectorCalculator.scaleVector(
			deviceDirection,
			100000,
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

	console.log("devicePointingPosition", devicePointingPosition);
	/******/

	const markers = [
		devicePointingPosition && (
			<Marker
				key="devicePointingPosition"
				position={[
					devicePointingPosition.latitude,
					devicePointingPosition.longitude,
				]}
				icon={CrossHairIcon}
			>
				<Popup>Pointing</Popup>
			</Marker>
		),
		devicePosition && (
			<Marker
				key="devicePosition"
				position={[devicePosition.latitude, devicePosition.longitude]}
				icon={DeviceIcon}
			>
				<Popup>This is you</Popup>
			</Marker>
		),
		issPosition && (
			<Marker
				key="issPosition"
				position={[issPosition.latitude, issPosition.longitude]}
				icon={ISSIcon}
			>
				<Popup>This is ISS</Popup>
			</Marker>
		),
	].filter((marker) => !!marker);

	return <Map center={devicePosition} markers={markers} zoom={8} />;
};
