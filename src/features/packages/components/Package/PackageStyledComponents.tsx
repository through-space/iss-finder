import React, { FC } from "react";
import clsx from "clsx";

export const PackageWrapper: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className={clsx("flex flex-col grow shrink basis-0 gap-2")}>
			{children}
		</div>
	);
};
