import React from "react";
import {
	MapContainer as MpContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
} from "react-leaflet";
import LocationMarker from "./LocationMarker";
const MapContainer = ({ data, setData }: any) => {
	return (
		<MpContainer center={[data.lat, data.lon]} zoom={20}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<LocationMarker lat={data.lat} lon={data.lon} setData={setData} />
		</MpContainer>
	);
};

export default MapContainer;
