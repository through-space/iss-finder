import { IGeoPosition } from "@common-types/positionTypes";
import {
	CrossHairIcon,
	DeviceIcon,
	ISSIcon,
} from "@ui-components/atoms/MapComponents/ISSIcons";
import { IMarker } from "@ui-components/molecules/LeafletMap/LeafletMapInterfaces";

export const getMarkers = (props: {
	issPosition?: IGeoPosition;
	devicePosition?: IGeoPosition;
	devicePointingPosition?: IGeoPosition;
}): IMarker[] => {
	const { devicePointingPosition, issPosition, devicePosition } = props;

	return [
		devicePointingPosition && {
			id: "devicePointingPosition",
			position: devicePointingPosition,
			tooltip: "devicePointingPosition",
			icon: CrossHairIcon,
		},
		devicePosition && {
			id: "devicePosition",
			position: devicePosition,
			tooltip: "devicePosition",
			icon: DeviceIcon,
		},
		issPosition && {
			id: "issPosition",
			position: issPosition,
			tooltip: "issPosition",
			icon: ISSIcon,
		},
	].filter((marker) => !!marker);
};
