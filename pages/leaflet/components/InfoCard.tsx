"use client";

import React, { useState, useEffect, useRef } from "react";
const InfoCard = ({ data }: any) => {
	const timezoneOffset = data?.timezone / (60 * 60);
	// console.log(timezoneOffset)
	const [celcius, setCelcius] = useState(false);
	const [currentTime, setCurrentTime] = useState<string>();
	const intervalRef = useRef<any>(null);
	const time = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			const date = new Date();
			const localTime = date.getTime();
			const localOffset = date.getTimezoneOffset() * 60000;
			const utc = localTime + localOffset;
			console.log(utc, timezoneOffset);
			const newTime = utc + 3600000 * timezoneOffset;
			const newTimeNow = new Date(newTime).toLocaleString();
			setCurrentTime(newTimeNow);
		}, 1000);
	};

	useEffect(() => {
		time();
	}, [data]);
	return (
		<div className="data z-10 p-8 flex rounded-lg absolute md: translate-x-16 bg-white">
			<div>
				<h2> Country</h2>
				<h1>
					{data?.sys.country},{data?.name}
				</h1>
			</div>

			<div className="flex-grow">
				<h2>Time</h2>
				<h1>{currentTime}</h1>
			</div>
			<div>
				<h2
					className="hover:opacity-50 cursor-pointer"
					onClick={() => setCelcius(!celcius)}
				>
					Weather/Temp <span>{celcius ? "C" : "K"} &deg;</span>
				</h2>
				<img
					src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
					alt="weather icon"
				></img>{" "}
				<h1>{data?.weather[0].main}</h1>
				<h1>
					{celcius
						? Math.floor(data?.main.temp - 273.15) + " C"
						: data?.main.temp + "K"}
					&deg;
				</h1>
			</div>
			<div>
				<h2>Description</h2>
				<h1 className=" capitalize">{data?.weather[0].description}</h1>
			</div>
		</div>
	);
};

export default InfoCard;
