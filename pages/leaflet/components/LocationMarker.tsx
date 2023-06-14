import L, { LatLng } from "leaflet";
import React, { useEffect, useState } from "react";

import {
	MapContainer as MpContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
} from "react-leaflet";

export default function LocationMarker({ lat, lon, setData }: any) {
	const [position, setPosition] = useState<LatLng | null>(null);
	const [init, setInit] = useState(false);
	const [bbox, setBbox] = useState([""]);
	const map = useMap();
	useEffect(() => {
		if (!init && typeof window !== undefined) {
			map.locate().on("locationfound", function (e) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());

				setData({
					lat: e.latlng.lat,
					lon: e.latlng.lng,
				});
				setInit(true);
				setBbox(e.bounds.toBBoxString().split(","));
			});
		} else {
			map.flyTo([lat, lon]);
		}
	}, [map, setData, init, lat, lon]);

	return position === null ? null : (
		<Marker position={init ? [lat, lon] : position}>
			<Popup>
				You are here. <br />
				Map bbox: <br />
				<b>Southwest lng</b>: {bbox[0]} <br />
				<b>Southwest lat</b>: {bbox[1]} <br />
				<b>Northeast lng</b>: {bbox[2]} <br />
				<b>Northeast lat</b>: {bbox[3]}
			</Popup>
		</Marker>
	);
}
