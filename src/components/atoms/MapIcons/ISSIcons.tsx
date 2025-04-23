import L, { IconOptions } from "leaflet";
import issIcon from "@assets/icons/iss-icon.svg";
import deviceIcon from "@assets/icons/house-color-icon.svg";

const defaultMapIconSettings: IconOptions = {
	iconUrl: "",
	iconSize: [38, 95],
	// iconAnchor: [22, 94],
	popupAnchor: [-3, -76],
	// shadowUrl: 'my-icon-shadow.png',
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
