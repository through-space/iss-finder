import { FC, ReactNode } from "react";
import {
	FeaturesListLayoutWrapper,
	FeaturesListWrapper,
} from "@ui-components/layouts/FeaturesListLayout/FeaturesListLayoutStyledComponents";

export const FeaturesListLayout: FC<{ children?: ReactNode }> = ({
	children,
}) => {
	return (
		<FeaturesListLayoutWrapper>
			<FeaturesListWrapper>{children}</FeaturesListWrapper>
		</FeaturesListLayoutWrapper>
	);
};
