import { FC, ReactNode } from "react";

export const MapWrapper: FC<{ children?: ReactNode }> = ({ children }) => {
	return <div className={"h-full flex flex-col"}>{children}</div>;
};
