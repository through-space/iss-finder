import { FC } from "react";
import { FeaturesListLayout } from "../../components/layouts/FeaturesListLayout/FeaturesListLayout";
import { ISSLocationTest } from "../../components/organisms/ISSLocationTest/ISSLocationTest";

export const HomePage: FC = () => {
	return (
		<FeaturesListLayout>
			<h1>🛰️ ISS Finder 🛰</h1>
			<ISSLocationTest />
		</FeaturesListLayout>
	);
};
