import { useMap } from "react-leaflet";
import { useEffect } from "react";

export interface IRecentMapProps {
	center: [number, number];
	zoom: number;
}
export const RecenterMap = ({ center, zoom }: IRecentMapProps) => {
	const map = useMap();

	useEffect(() => {
		const handleResize = () => {
			map.invalidateSize();
			map.setView(center, zoom);
		};

		setTimeout(handleResize, 0);

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [map, center, zoom]);

	return null;
};
