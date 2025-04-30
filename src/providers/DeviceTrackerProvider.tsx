import { FC, ReactNode } from "react";
import { useDeviceTracker } from "@hooks/useDeviceTracker";

export const DeviceTrackerProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	useDeviceTracker();

	return <>{children}</>;
};
