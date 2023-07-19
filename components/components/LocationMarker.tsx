import { icon } from "leaflet";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
// import { Marker } from "react-leaflet";
export const LazyMarker = dynamic(
	import("react-leaflet").then((mod) => mod.Marker),
	{
		ssr: false,
	}
);
// export const Center = dynamic(() => import("./MapCenter"), {
// 	ssr: false,
// });

export const LazyPopup = dynamic(
	async () => (await import("react-leaflet")).Popup,
	{
		ssr: false,
	}
);
export default function LocationMarker({ lat, lon, setData }: any) {
	const [position, setPosition] = useState<any | null>(null);
	const [init, setInit] = useState(false);
	const [bbox, setBbox] = useState([""]);
	const map = useMap();
	useEffect(() => {
		if (lat !== null && lon !== null) {
			setPosition([lat, lon]);
			map.flyTo([lat, lon]);
		}
	}, [lat, lon]);
	useEffect(() => {
		if (!init) {
			navigator.geolocation.getCurrentPosition((pos) =>
				setData({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude,
				})
			);
		}
	}, []);

	return position === null ? null : typeof window !== "undefined" ? (
		<LazyMarker position={init ? [lat, lon] : position}>
			<LazyPopup>
				A pretty CSS3 LazyPopup. <br /> Easily customizable.
			</LazyPopup>
		</LazyMarker>
	) : (
		<></>
	);
}
