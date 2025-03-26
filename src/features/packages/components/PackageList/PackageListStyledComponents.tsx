import clsx from "clsx";
import React, { FC, ReactNode } from "react";

export const PackageListWrapper: FC<{ children?: ReactNode }> = (props) => {
	return (
		<div className={clsx("flex flex-row w-full justify-around gap-3")}>
			{props.children}
		</div>
	);
};
