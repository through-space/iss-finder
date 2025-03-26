import { allPackages } from "../../config/allPackages";
import { EPackageID } from "../../types";

export const getPackagesByIDs = (packageNames: EPackageID[]) => {
	return packageNames
		.map((packageID) => allPackages[packageID])
		.filter((packageInfo) => packageInfo !== undefined);
};
