import { FC } from "react";
import { FeaturesListLayout } from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayout";
import { IssTrackerProvider } from "../../providers/IssTrackerProvider";
import { DeviceTrackerProvider } from "../../providers/DeviceTrackerProvider";
import { WorldMap } from "@features/WorldMap/WorldMap";

export const HomePage: FC = () => {
	return (
		<FeaturesListLayout>
			<h1>🛰️ ISS Finder 🛰</h1>
			<IssTrackerProvider>
				<DeviceTrackerProvider>
					<WorldMap />
				</DeviceTrackerProvider>
			</IssTrackerProvider>
		</FeaturesListLayout>
	);
};
