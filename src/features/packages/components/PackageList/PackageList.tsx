import { FC } from "react";
import { IPackageListProps } from "./PackageListInterfaces";
import { PackageListWrapper } from "./PackageListStyledComponents";
import { Package } from "../Package/Package";
import { getPackagesByIDs } from "./PackageListConsts";

export const PackageList: FC<IPackageListProps> = (props) => {
	const { packageIDs } = props;

	const allPackages = getPackagesByIDs(packageIDs);

	return (
		<PackageListWrapper>
			{allPackages.map((packageInfo) => (
				<Package
					key={packageInfo.name}
					name={packageInfo.name}
					imageSource={packageInfo.image}
				/>
			))}
		</PackageListWrapper>
	);
};
