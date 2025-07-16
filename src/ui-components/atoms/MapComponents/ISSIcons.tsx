import L, { IconOptions } from "leaflet";
import issIcon from "@assets/icons/iss-icon.svg";
import deviceIcon from "@assets/icons/house-color-icon.svg";
import crosshairIcon from "@assets/icons/crosshair.svg";

const defaultMapIconSettings: IconOptions = {
	iconUrl: "",
	iconSize: [20, 20],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94],
};

export const ISSIcon = L.icon({
	...defaultMapIconSettings,
	iconUrl: issIcon,
});

export const DeviceIcon = L.icon({
	...defaultMapIconSettings,
	iconUrl: deviceIcon,
});

export const CrossHairIcon = L.icon({
	...defaultMapIconSettings,
	iconUrl: crosshairIcon,
});
