import React, { FC } from "react";
import { IISSLocationTestProps } from "./ISSLocationTestInterfaces";
import { ISSLocationTestWrapper } from "./ISSLocationTestStyledComponents";
import { Map } from "../../molecules/Map/Map";
import { Marker, Popup } from "react-leaflet";
import { DeviceIcon, ISSIcon } from "../../atoms/MapIcons/ISSIcons";
import { useIssStateStore } from "@stores/issStateStore/issStateStore";
import { useIssTracker } from "@hooks/useIssTracker";
import { useDeviceTracker } from "@hooks/useDeviceTracker";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";

export const ISSLocationTest: FC<IISSLocationTestProps> = () => {
	useIssTracker();
	useDeviceTracker();

	const issPosition = useIssStateStore((state) => {
		return state.currentPosition;
	});
	const devicePosition = useDeviceStateStore((state) => {
		return state.position;
	});

	// TODO: move Markers to Separate components?
	// TODO: Common component for MapMarker?

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

	return (
		<ISSLocationTestWrapper>
			<Map center={devicePosition} markers={markers} />
			<div>ISS Latitude: {issPosition?.latitude}</div>
			<div>ISS Longitude: {issPosition?.longitude}</div>
			<div>ISS Altitude: {issPosition?.altitude}</div>

			<div>My Latitude: {devicePosition?.latitude}</div>
			<div>My Longitude: {devicePosition?.longitude}</div>
			<div>My Altitude: {devicePosition?.altitude}</div>
		</ISSLocationTestWrapper>
	);
};
