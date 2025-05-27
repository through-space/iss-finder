export interface IApiDateConversionTestCase {
	name: string;
	input: { date: string; utc_offset: number; time: string };
	expected: number;
}
