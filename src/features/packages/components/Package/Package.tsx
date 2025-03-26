import { FC } from "react";
import { IPackageProps } from "./PackageInterfaces";
import { PackageWrapper } from "./PackageStyledComponents";

export const Package: FC<IPackageProps> = (props) => {
	const { name, imageSource } = props;

	// TODO: image and name to separate components or make global title component?
	return (
		<PackageWrapper>
			<img
				className="aspect-square flex-3/4"
				src={imageSource}
				alt={name}
				title={name}
			/>
			<div>{name}</div>
		</PackageWrapper>
	);
};
