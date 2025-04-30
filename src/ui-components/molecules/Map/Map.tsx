// Map.tsx
import React, { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { IMapProps } from "./MapInterfaces";
import { DEFAULT_MAP_PROPS } from "./MapConsts";

export const Map: FC<IMapProps> = (props) => {
	const {
		center = DEFAULT_MAP_PROPS.center,
		zoom = DEFAULT_MAP_PROPS.zoom,
		markers,
	} = props;

	const mapCenter = center ?? DEFAULT_MAP_PROPS.center;

	return (
		<MapContainer
			center={[mapCenter?.latitude, mapCenter?.longitude]}
			zoom={zoom}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{markers}
		</MapContainer>
	);
};
