import { describe, test, expect } from "vitest";
import { IGeoPosition } from "@common-types/positionTypes";
import { IDeviceOrientation } from "@services/device-state/deviceStateServiceInterfaces";
import { deviceStateService } from "@services/device-state/deviceStateService";
import { geoCalculator } from "@utils/geo-calculator/geoCalculator";

const positions: IGeoPosition[] = [
	{
		latitude: 31.78311477868904,
		longitude: 35.2253950966083,
		altitude: 0,
	},
];

const orientations: Record<string, IDeviceOrientation> = {
	"display-down": { alpha: 0, beta: -180, gamma: 0 },
};

describe("Testing getCameraDirection()", () => {
	test("Camera pointing up", () => {
		const randomPositionIndex = Math.floor(
			Math.random() * positions.length,
		);

		const position = positions[randomPositionIndex];
		const orientation = orientations["display-down"];
		const direction = deviceStateService.getCameraDirection({
			position,
			newOrientation: orientation,
		});
		console.log(direction);
		console.log(geoCalculator.getPositionVector(position));

		expect(direction).toEqual(geoCalculator.getPositionVector(position));
	});
});
