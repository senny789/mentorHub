import { motion } from "framer-motion";
import React from "react";

const SelectedCountry = ({ selectedCountry }: { selectedCountry: any }) => {
	return (
		<motion.div
			initial={{
				x: 100,
				opacity: 0.5,
			}}
			animate={{
				x: 0,
				opacity: 1,
			}}
			transition={{ duration: 0.25 }}
			className="mt-16 flex flex-col lg:flex-row w-full gap-20"
		>
			<img
				className="aspect-video w-full lg:w-[50%] flex-shrink-0 shadow-xl"
				src={selectedCountry.flags.svg}
				alt={selectedCountry.flags.alt}
			/>
			<section className="flex-grow-0">
				<h1 className=" font-bold text-3xl">{selectedCountry.name.common}</h1>
				<div className="flex flex-col lg:flex-row gap-10 mb-5">
					<div className="flex flex-col gap-4">
						<span className="flex">
							<h2 className="font-semibold ">Native Name:</h2>
							{selectedCountry.name.official}
						</span>
						<span className="flex">
							<h2 className="font-semibold ">Population:</h2>
							{selectedCountry.population}
						</span>
						<span className="flex">
							<h2 className="font-semibold ">Region:</h2>
							{selectedCountry.region}
						</span>
						<span className="flex">
							<h2 className="font-semibold ">Sub Region:</h2>
							{selectedCountry.subregion}
						</span>
						<span className="flex">
							<h2 className="font-semibold ">Capital:</h2>
							{selectedCountry.capital}
						</span>
					</div>
					<div className="flex flex-col gap-4 ">
						<span className="flex">
							<h2 className="font-semibold ">Top Level Domain:</h2>
							{selectedCountry.tld}
						</span>
						<span className="flex flex-wrap">
							<h2 className="font-semibold ">Currencies:</h2>
							{Object.keys(selectedCountry.currencies).map((currency) => {
								return selectedCountry.currencies[currency].name;
							})}
						</span>
						<span className="flex flex-wrap">
							<h2 className="font-semibold ">Languages:</h2>

							{Object.keys(selectedCountry.languages).map((language) => {
								return (
									<span className={` after:content-[',']`}>
										{selectedCountry.languages[language]}
									</span>
								);
							})}
						</span>
					</div>
				</div>
				<span className="flex flex-wrap gap-5">
					{" "}
					<h2 className="font-semibold ">BorderCountries:</h2>
					{selectedCountry.borders
						? selectedCountry.borders.map((border: string) => {
								return (
									<button className="shadow-[0px_2px_10px_0px_rgba(100,100,111,0.5)] p-1 px-8  mx-2  rounded-md">
										{border}
									</button>
								);
						  })
						: "No country borders this nation"}
				</span>
			</section>
		</motion.div>
	);
};

export default SelectedCountry;
