import { FC, ReactNode } from "react";

export const ISSLocationTestWrapper: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return <div className="flex flex-col">{children}</div>;
};
