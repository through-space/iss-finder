import React, { memo } from "react";
import { IMarker } from "@ui-components/molecules/LeafletMap/LeafletMapInterfaces";
import { Marker, Popup } from "react-leaflet";

export const MemoizedMarker = memo(
	({ id, position, tooltip, icon }: IMarker) => {
		return (
			<Marker
				key={id}
				position={[position.latitude, position.longitude]}
				icon={icon}
			>
				<Popup>{tooltip}</Popup>
			</Marker>
		);
	},
	(prev, next) =>
		prev.id === next.id &&
		prev.tooltip === next.tooltip &&
		prev.icon === next.icon &&
		prev.position.latitude === next.position.latitude &&
		prev.position.longitude === next.position.longitude,
);
