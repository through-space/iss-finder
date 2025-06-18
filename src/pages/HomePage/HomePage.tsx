import { FC } from "react";
import { FeaturesListLayout } from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayout";
import { WorldMap } from "@features/WorldMap/WorldMap";
import { Visibility } from "@features/Visibility/Visibility";
import { useDeviceLocation } from "@hooks/useDeviceLocation";
import { useIssTracker } from "@hooks/useIssTracker";
import { useDeviceOrientation } from "@hooks/useDeviceOrientation";
import { DirectionGuide } from "@features/DirectionGuide/DirectionGuide";

export const HomePage: FC = () => {
	useDeviceOrientation();
	useDeviceLocation();
	useIssTracker();

	console.log("rendering homepage");

	return (
		<FeaturesListLayout>
			<h1> 🛰️ ISS Finder 🛰️</h1>
			<DirectionGuide />
			<Visibility />
			<WorldMap />
		</FeaturesListLayout>
	);
};
