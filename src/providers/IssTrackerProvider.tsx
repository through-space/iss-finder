import { FC, ReactNode } from "react";
import { useIssTracker } from "@hooks/useIssTracker";

export const IssTrackerProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	useIssTracker();

	return <>{children}</>;
};
