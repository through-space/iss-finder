import { FC, useEffect, useState } from "react";
import { FeaturesListLayout } from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayout";
import { WorldMap } from "@features/WorldMap/WorldMap";
import { Visibility } from "@features/Visibility/Visibility";
import { useDeviceOrientation } from "@hooks/useDeviceOrientation";
import { useDeviceLocation } from "@hooks/useDeviceLocation";
import { useIssTracker } from "@hooks/useIssTracker";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";

export const HomePage: FC = () => {
	// useDeviceOrientation();
	useDeviceLocation();
	useIssTracker();

	const [event, setEvent] = useState<DeviceOrientationEvent>();

	const geolocationPositionFull = useDeviceStateStore(
		(state) => state.geolocationPositionFull,
	);

	// console.log(geolocationPositionFull.coords);
	// const heading = geolocationPositionFull.coords;
	// useEffect(() => {
	// 	window.addEventListener("deviceorientation", (e) => {
	// window.addEventListener("deviceorientationabsolute", (e) => {
	// console.log(e);
	// setEvent(e);
	// });
	// ondeviceorientationabsolute = (e) => {
	// 	setEvent(e);
	// };
	// }, []);

	console.log("rendering homepage");

	return (
		<FeaturesListLayout>
			<h1> 🛰️ ISS Finder 🛰️</h1>
			<ul>
				<li>alpha: {Math.round(event?.alpha)}</li>
				<li>beta: {Math.round(event?.beta)}</li>
				<li>gamma: {Math.round(event?.gamma)}</li>
			</ul>
			{/*<IssTrackerProvider>*/}
			{/*	<DeviceOrientationProvider>*/}
			{/*		<DeviceTrackerProvider>*/}
			<Visibility />
			<WorldMap />
			{/*		</DeviceTrackerProvider>*/}
			{/*	</DeviceOrientationProvider>*/}
			{/*</IssTrackerProvider>*/}
		</FeaturesListLayout>
	);
};
