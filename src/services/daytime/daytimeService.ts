import { IDaytimeService } from "@services/daytime/daytimeServiceInterfaces";
import { isDaytime } from "@services/daytime/daytimeServiceConsts";

export const daytimeService: IDaytimeService = {
	isDaytime,
};
