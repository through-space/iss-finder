// Map.tsx
import React, { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { IMapProps } from "./MapInterfaces";
import { DEFAULT_MAP_PROPS } from "./MapConsts";
import { MapWrapper } from "@ui-components/molecules/Map/MapStyledComponents";
import { RecenterMap } from "@ui-components/atoms/MapComponents/RecenterMap";

export const Map: FC<IMapProps> = (props) => {
	const {
		center = DEFAULT_MAP_PROPS.center,
		zoom = DEFAULT_MAP_PROPS.zoom,
		markers,
	} = props;

	return (
		<MapWrapper>
			<MapContainer
				center={[center.latitude, center.longitude]}
				zoom={zoom}
				scrollWheelZoom={false}
				style={{ width: "100%", height: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<RecenterMap
					center={[center.latitude, center.longitude]}
					zoom={zoom}
				/>
				{markers}
			</MapContainer>
		</MapWrapper>
	);
};
