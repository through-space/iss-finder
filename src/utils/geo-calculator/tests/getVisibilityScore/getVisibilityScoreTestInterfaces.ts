import { IGeoPosition } from "../../../../common-types/positionTypes";

export enum ETestCaseType {
	STRICT_EQUAL,
	ERROR,
}
export interface IISVisibleTestCase {
	name: string;
	input: { position1: IGeoPosition; position2: IGeoPosition };
	expected: boolean;
}

export interface IISSVisibleLocation {
	name: string;
	gmapsPosition?: string;
	position: IGeoPosition;
}
