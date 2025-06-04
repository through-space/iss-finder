import { FC } from "react";
import { FeaturesListLayout } from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayout";
import { WorldMap } from "@features/WorldMap/WorldMap";
import { Visibility } from "@features/Visibility/Visibility";
import { useDeviceLocation } from "@hooks/useDeviceLocation";
import { useIssTracker } from "@hooks/useIssTracker";
import { useDeviceStateStore } from "@stores/deviceStateStore/deviceStateStore";
import { useDeviceOrientation } from "@hooks/useDeviceOrientation";

export const HomePage: FC = () => {
	useDeviceOrientation();
	useDeviceLocation();
	useIssTracker();

	const deviceOrientation = useDeviceStateStore((state) => state.orientation);
	console.log("rendering homepage");

	return (
		<FeaturesListLayout>
			<h1> 🛰️ ISS Finder 🛰️</h1>
			<ul>
				<li>alpha: {Math.round(deviceOrientation?.alpha)}</li>
				<li>beta: {Math.round(deviceOrientation?.beta)}</li>
				<li>gamma: {Math.round(deviceOrientation?.gamma)}</li>
			</ul>
			<Visibility />
			<WorldMap />
		</FeaturesListLayout>
	);
};
