import { motion } from "framer-motion";

import React, { useState, useMemo, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import Country from "./Country";
import { useQuery } from "react-query";
import { ThemeContext } from "@/pages/rest-countries";

const FilterCountries = ({
	renderSize,
	setSelectedCountry,
}: {
	renderSize: number;
	setSelectedCountry: (val: any) => void;
}) => {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [filter, setFilter] = useState({
		isOpen: false,
		selected: "All",
	});
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};
	let timeout: any;

	const debounceSearch = (val: string) => {
		setSearch(val);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setDebouncedSearch(val);
		}, 1000);
	};
	const getAllCountries = async () => {
		const res = await fetch("https://restcountries.com/v3.1/all");
		const data = await res.json();
		return data;
	};

	const query = useQuery({
		queryKey: ["allCountries"],
		queryFn: () => getAllCountries(),
	});

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
	const [theme] = useContext(ThemeContext);
	return (
		<div className="w-[90%] m-auto">
			<section className="flex flex-wrap gap-4 justify-between pt-10 m-10">
				<span className="flex items-center shadow-[0px_7px_29px_0px_rgba(100,100,111,0.5)]  w-fit   lg:py-2 lg:px-5 rounded-md">
					<AiOutlineSearch className="m-2" size={"1.5rem"} />
					<input
						className=" focus:outline-none flex-grow bg-inherit"
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
					className="flex  w-max p-4 relative cursor-pointer shadow-[0px_7px_29px_0px_rgba(100,100,111,0.5)] place-items-center rounded-md"
				>
					<p className=" mr-4">{filter.selected}</p>
					<RiArrowDropDownLine size={"1.5rem"} />
					{filter.isOpen && (
						<span
							className={`list-none absolute top-[110%] left-0 ${
								theme === "dark" ? "bg-slate-800" : "bg-white"
							} w-full p-5 z-10 rounded-md`}
						>
							{["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
								(country: string) => {
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
								}
							)}
						</span>
					)}
				</span>
			</section>
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)]  gap-x-10 gap-y-20 "
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
	);
};

export default FilterCountries;
