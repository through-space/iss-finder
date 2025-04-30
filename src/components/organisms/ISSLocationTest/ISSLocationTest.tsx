import React, { FC } from "react";
import { IISSLocationTestProps } from "./ISSLocationTestInterfaces";
import { ISSLocationTestWrapper } from "./ISSLocationTestStyledComponents";
import { useIssTracker } from "@hooks/useIssTracker";
import { useDeviceTracker } from "@hooks/useDeviceTracker";
import { WorldMap } from "../../../features/WorldMap/WorldMap";

export const ISSLocationTest: FC<IISSLocationTestProps> = () => {
	useIssTracker();
	useDeviceTracker();

	return (
		<ISSLocationTestWrapper>
			<WorldMap />
			{/*<div>ISS Latitude: {issPosition?.latitude}</div>*/}
			{/*<div>ISS Longitude: {issPosition?.longitude}</div>*/}
			{/*<div>ISS Altitude: {issPosition?.altitude}</div>*/}

			{/*<div>My Latitude: {devicePosition?.latitude}</div>*/}
			{/*<div>My Longitude: {devicePosition?.longitude}</div>*/}
			{/*<div>My Altitude: {devicePosition?.altitude}</div>*/}
		</ISSLocationTestWrapper>
	);
};
