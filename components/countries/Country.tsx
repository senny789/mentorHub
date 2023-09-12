import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/pages/rest-countries";
import Image from "next/image";
const Country = (props: any) => {
	const data = props?.data;
	const [theme] = useContext(ThemeContext);
	return (
		<motion.div
			initial={{
				opacity: 0.5,
			}}
			whileInView={{
				opacity: 1,
				transition: {
					duration: 0.85,
				},
			}}
			onClick={() => {
				props.setSelectedCountry(data);
			}}
			className={`flex flex-col hover:opacity-[0.5] cursor-pointer  shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-md ${
				theme === "dark" ? "bg-slate-900 " : ""
			}`}
		>
			<Image
				className="aspect-video rounded-md "
				src={data?.flags?.png}
				alt={data?.flags?.alt}
			></Image>
			<div className="px-5 py-8">
				<h1 className="font-bold text-xl">{data?.name.common}</h1>
				<span className="flex py-2">
					<h2 className="font-bold">Population:</h2>
					{data?.population}
				</span>
				<span className="flex py-2">
					<h2 className="font-bold">Region:</h2>
					{data?.region}
				</span>
				<span className="flex py-2">
					<h2 className="font-bold">Capital:</h2>
					{data?.capital}
				</span>
			</div>
		</motion.div>
	);
};

export default Country;
