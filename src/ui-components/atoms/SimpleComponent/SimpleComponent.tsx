import { FC, ReactNode } from "react";

export const SimpleComponent: FC<{ children?: ReactNode }> = ({ children }) => {
	return (
		<>
			<>I am a Simple Component</>
			<>{children}</>
		</>
	);
};
