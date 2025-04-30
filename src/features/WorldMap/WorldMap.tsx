import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { Marker, Popup } from "react-leaflet";
import { DeviceIcon, ISSIcon } from "../../components/atoms/MapIcons/ISSIcons";
import React from "react";
import { Map } from "../../components/molecules/Map/Map";

export const WorldMap = () => {
	const issPosition = useIssStateStore((state) => {
		return state.currentPosition;
	});
	const devicePosition = useDeviceStateStore((state) => {
		return state.position;
	});

	const markers = [
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

	return <Map center={devicePosition} markers={markers} />;
};
