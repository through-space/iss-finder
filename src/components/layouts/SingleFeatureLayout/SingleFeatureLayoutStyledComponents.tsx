import { FC, ReactNode } from "react";

export const SingleFeatureLayoutWrapper: FC<{children?: ReactNode}> = ({
	children,
}) => {
	return <div>{children}</div>;
};
