import { useMap } from "react-leaflet";
import { memo, useEffect } from "react";

export interface IRecentMapProps {
	center: [number, number];
	zoom: number;
}

export const RecenterMap = memo(({ center, zoom }: IRecentMapProps) => {
	const map = useMap();

	console.log("rendering RecenterMap");

	useEffect(() => {
		// if (!center) {
		// 	return;
		// }

		const handleResize = () => {
			if (!center) {
				return;
			}

			map.invalidateSize();
			map.setView(center, zoom);
		};

		setTimeout(handleResize, 0);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [map, center, zoom]);

	return null;
});
