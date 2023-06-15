import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export const LazyMarker = dynamic(
	async () => (await import("react-leaflet")).Marker,
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
	useEffect(() => {}, []);
	return position === null ? null : typeof window !== "undefined" ? (
		<Suspense fallback={<></>}>
			{/* {typeof window !== "undefined" && ( */}
			{/* // <Center
				// 	init={init}
				// 	setPosition={setPosition}
				// 	setInit={setInit}
				// 	setBbox={setBbox}
				// 	setData={setData}
				// 	lat={lat}
				// 	lon={lon}
				// /> */}
			{/* )} */}
			<LazyMarker position={init ? [lat, lon] : position}>
				<Suspense fallback={<></>}>
					<LazyPopup>
						You are here. <br />
						Map bbox: <br />
						<b>Southwest lng</b>: {bbox[0]} <br />
						<b>Southwest lat</b>: {bbox[1]} <br />
						<b>Northeast lng</b>: {bbox[2]} <br />
						<b>Northeast lat</b>: {bbox[3]}
					</LazyPopup>
				</Suspense>
			</LazyMarker>
		</Suspense>
	) : (
		<></>
	);
}
