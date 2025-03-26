import { FC, useState } from "react";
import { EPackageID } from "../../features/packages/types";
import { PackageList } from "../../features/packages/components/PackageList/PackageList";
import { SimpleComponent } from "@ui-components/atoms/SimpleComponent/SimpleComponent";
import { FeaturesListLayout } from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayout";

export const HomePage: FC = () => {
	const [count, setCount] = useState<number>(0);

	const packages = [
		EPackageID.typescript,
		EPackageID.react,
		EPackageID.vite,
		EPackageID.tailwindcss,
		EPackageID.prettier,
		EPackageID.eslint,
	];

	return (
		<FeaturesListLayout>
			<h1>🦄🦄 New Project 🦄🦄</h1>
			<PackageList packageIDs={packages} />
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code>
				</p>
			</div>
			<SimpleComponent>I am a child of SimpleComponent</SimpleComponent>
		</FeaturesListLayout>
	);
};
