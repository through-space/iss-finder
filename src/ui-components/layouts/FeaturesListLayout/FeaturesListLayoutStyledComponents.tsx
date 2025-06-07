import { FC, ReactNode } from "react";
import clsx from "clsx";

export const FeaturesListLayoutWrapper: FC<{ children?: ReactNode }> = ({
	children,
}) => {
	return (
		<div
			className={clsx(
				"w-full h-full flex flex-col justify-center",
				"grow items-center",
			)}
		>
			{children}
		</div>
	);
};

export const FeaturesListWrapper: FC<{ children?: ReactNode }> = ({
	children,
}) => {
	return (
		<div
			className={clsx(
				"w-3/4",
				"flex flex-col gap-10 h-full",
				"overflow-hidden",
			)}
		>
			{children}
		</div>
	);
};
