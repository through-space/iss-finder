import React, { FC, useEffect, useRef, useState } from "react";
import { IISSLocationTestProps } from "./ISSLocationTestInterfaces";
import { ISSLocationTestWrapper } from "./ISSLocationTestStyledComponents";
import { IGeoPosition } from "../../../types/positionTypes";
import { deviceLocationService } from "@services/device-location/deviceLocation";
import {
	UPDATE_ISS_POSITION_INTERVAL,
	updateISSLocation,
} from "./ISSLocationTestConsts";
import { Map } from "../../molecules/Map/Map";
import { Marker, Popup } from "react-leaflet";
import { DeviceIcon, ISSIcon } from "../../atoms/MapIcons/ISSIcons";

export const ISSLocationTest: FC<IISSLocationTestProps> = (props) => {
	const [issPosition, setIssPosition] = useState<IGeoPosition>(null);
	const [devicePosition, setDevicePosition] = useState<IGeoPosition>(null);
	const updateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		updateTimer.current = setInterval(() => {
			updateISSLocation(setIssPosition);
		}, UPDATE_ISS_POSITION_INTERVAL);

		updateISSLocation(setIssPosition);

		deviceLocationService.getDeviceLocation().then((geoLocation) => {
			setDevicePosition(geoLocation);
		});

		fetch("https://dog.ceo/api/breeds/image/random").then((data) =>
			console.log(data),
		);
	}, []);

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
