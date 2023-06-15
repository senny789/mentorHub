import React, { Suspense } from "react";

import dynamic from "next/dynamic";
const LazyMapContainer = dynamic(
	() => import("react-leaflet").then((mod) => mod.MapContainer),
	{ ssr: false }
);
const LazyTileLayer = dynamic(
	() => import("react-leaflet").then((mod) => mod.TileLayer),
	{ ssr: false }
);
const LocationMarker = dynamic(() => import("./LocationMarker"), {
	ssr: false,
});
const MapContainer = ({ data, setData }: any) => {
	if (typeof window === "undefined") {
		return <></>;
	}
	return (
		<Suspense fallback={<></>}>
			<LazyMapContainer center={[data.lat, data.lon]} zoom={20}>
				<Suspense fallback={<></>}>
					<LazyTileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<LocationMarker lat={data.lat} lon={data.lon} setData={setData} />
				</Suspense>
			</LazyMapContainer>
		</Suspense>
	);
};

export default MapContainer;
