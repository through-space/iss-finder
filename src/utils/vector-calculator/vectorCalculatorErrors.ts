export enum EVectorCalculatorErrorType {
	GENERAL,
	DIMENSIONS_DISMATCH,
}

const vectorCalculatorErrorMessages: Record<
	EVectorCalculatorErrorType,
	string
> = {
	[EVectorCalculatorErrorType.GENERAL]: "VectorCalculator Error",
	[EVectorCalculatorErrorType.DIMENSIONS_DISMATCH]:
		"Vectors must be the same dimension",
};

export const getErrorMessage = (errorType: EVectorCalculatorErrorType) => {
	return (
		vectorCalculatorErrorMessages[errorType] ??
		vectorCalculatorErrorMessages[EVectorCalculatorErrorType.GENERAL]
	);
};
