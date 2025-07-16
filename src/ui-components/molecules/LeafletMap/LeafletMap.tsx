import React, { FC, memo, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ILeafletMapProps } from "./LeafletMapInterfaces";
import { DEFAULT_MAP_PROPS } from "./LeafletMapConsts";
import { MapWrapper } from "@ui-components/molecules/LeafletMap/LeafletMapStyledComponents";
import { RecenterMap } from "@ui-components/atoms/MapComponents/RecenterMap";
import { MemoizedMarker } from "@ui-components/molecules/LeafletMap/MemoizedMarker";

export const LeafletMap: FC<ILeafletMapProps> = memo(
	(props) => {
		const {
			center = DEFAULT_MAP_PROPS.center,
			zoom = DEFAULT_MAP_PROPS.zoom,
			markers = [],
		} = props;

		const [mapInitialized, setMapInitialized] = useState(false);

		useEffect(() => {
			if (!mapInitialized && center.longitude && center.latitude) {
				setMapInitialized(true);
			}
		}, [center, mapInitialized]);

		const markerComponents = useMemo(
			() =>
				markers.map((marker) => (
					<MemoizedMarker
						key={marker.id}
						id={marker.id}
						position={marker.position}
						icon={marker.icon}
						tooltip={marker.tooltip}
					/>
				)),
			[markers],
		);

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
						center={
							mapInitialized
								? undefined
								: [center.latitude, center.longitude]
						}
						zoom={mapInitialized ? undefined : 5}
					/>
					{markerComponents}
				</MapContainer>
			</MapWrapper>
		);
	},
	(prev, next) =>
		prev.zoom === next.zoom &&
		prev.center.latitude === next.center.latitude &&
		prev.center.longitude === next.center.longitude &&
		prev.markers === next.markers,
);
