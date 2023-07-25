import React, { useEffect, useMemo, useRef, useState } from "react";
import NavBar from "../../components/countries/NavBar";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import Country from "../../components/countries/Country";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
const RestCountries = () => {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [selectedCountry, setSelectedCountry] = useState<any>(null);
	const bottomRef = useRef(null);
	const [filter, setFilter] = useState({
		isOpen: false,
		selected: "All",
	});
	const getAllCountries = async () => {
		const res = await fetch("https://restcountries.com/v3.1/all");
		const data = await res.json();
		return data;
	};
	const query = useQuery({
		queryKey: ["allCountries"],
		queryFn: () => getAllCountries(),
	});
	let timeout: any;

	const debounceSearch = (val: string) => {
		setSearch(val);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setDebouncedSearch(val);
		}, 1000);
	};

	const filteredQueries = useMemo(() => {
		return query?.data?.filter((count: any, index: number) => {
			if (filter.selected === "All") {
				if (debouncedSearch === "") {
					return true;
				}
				return count.name.common
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase());
			} else {
				if (debouncedSearch === "") {
					return count.region === filter.selected;
				}
				return (
					count.region === filter.selected &&
					count.name.common
						.toLowerCase()
						.includes(debouncedSearch.toLowerCase())
				);
			}
		});
	}, [debouncedSearch, query, filter.selected]);
	const [renderSize, setRenderSize] = useState(8);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					console.log("intersecting", renderSize);
					setRenderSize((curr) => {
						return curr + 8;
					});
				}
			},
			{
				threshold: 0.25,
			}
		);

		if (bottomRef.current) {
			observer.observe(bottomRef.current);
		}

		return () => {
			if (bottomRef.current) {
				observer.unobserve(bottomRef.current);
			}
		};
	}, [bottomRef]);
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};
	return (
		<div>
			<NavBar />
			{selectedCountry === null ? (
				<div className="w-[90%] m-auto">
					<section className="flex justify-between pt-10 m-10">
						<span className="flex shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] bg-white w-[40%] py-2 px-5 rounded-md">
							<AiOutlineSearch className="m-2" size={"1.5rem"} />
							<input
								className=" focus:outline-none flex-grow"
								placeholder="Search for a country..."
								value={search}
								onChange={(e) => debounceSearch(e.target.value)}
							></input>
						</span>

						<span
							onClick={() => {
								setFilter((f) => {
									return {
										...filter,
										isOpen: !f.isOpen,
									};
								});
							}}
							className="flex bg-white w-max p-4 relative cursor-pointer shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] place-items-center rounded-md"
						>
							<p className=" mr-4">Filter by Region:{filter.selected}</p>
							<RiArrowDropDownLine size={"1.5rem"} />
							{filter.isOpen && (
								<span className="list-none absolute top-[110%] left-0 bg-white w-full p-5 z-10 rounded-md">
									{[
										"All",
										"Africa",
										"Americas",
										"Asia",
										"Europe",
										"Oceania",
									].map((country: string) => {
										return (
											<li
												key={country}
												className="cursor-pointer hover:opacity-[0.5]"
												onClick={(e) => {
													e.stopPropagation();
													setFilter({ isOpen: false, selected: country });
												}}
											>
												{country}
											</li>
										);
									})}
								</span>
							)}
						</span>
					</section>
					<motion.section
						variants={container}
						initial="hidden"
						animate="show"
						className="grid grid-cols-[repeat(4,1fr)] gap-x-10 gap-y-20 "
					>
						{query?.data?.length > 0 &&
							filteredQueries
								?.slice(0, renderSize)
								.map((desh: any, index: number) => {
									return (
										<Country
											key={desh + index}
											data={desh}
											setSelectedCountry={setSelectedCountry}
										/>
									);
								})}
					</motion.section>
				</div>
			) : (
				<div className="w-[90%] m-auto">
					<button
						onClick={() => setSelectedCountry(null)}
						className=" flex place-items-center px-8 py-2 shadow-simple gap-2 rounded-md mt-16"
					>
						<AiOutlineArrowLeft />
						Back
					</button>
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
						className="mt-16 flex w-full gap-20"
					>
						<img
							className="aspect-video w-[50%] flex-shrink-0 shadow-xl"
							src={selectedCountry.flags.svg}
							alt={selectedCountry.flags.alt}
						/>
						<section className="flex-grow-0">
							<h1 className=" font-bold text-3xl">
								{selectedCountry.name.common}
							</h1>
							<div className="flex  gap-10 mb-5">
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
				</div>
			)}
			<div
				ref={bottomRef}
				style={{
					height: "100px",
					width: "100%",
					background: "transparent",
				}}
			></div>
		</div>
	);
};

export default RestCountries;
