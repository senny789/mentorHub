import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";
import NavBar from "../../components/countries/NavBar";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";

import SelectedCountry from "@/components/countries/SelectedCountry";
import FilterCountries from "@/components/countries/FilterCountries";

export const ThemeContext = createContext<any>(null);
const RestCountries = () => {
	const [selectedCountry, setSelectedCountry] = useState<any>(null);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const bottomRef = useRef(null);

	const [renderSize, setRenderSize] = useState(8);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
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

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			<div
				className={`${
					theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
				} w-[100vw] overflow-hidden `}
			>
				<NavBar />
				{selectedCountry === null ? (
					<FilterCountries
						renderSize={renderSize}
						setSelectedCountry={setSelectedCountry}
					/>
				) : (
					<div className="w-[90%] m-auto">
						<button
							onClick={() => setSelectedCountry(null)}
							className=" flex place-items-center px-8 py-2 shadow-simple gap-2 rounded-md mt-16"
						>
							<AiOutlineArrowLeft />
							Back
						</button>
						<SelectedCountry selectedCountry={selectedCountry} />
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
		</ThemeContext.Provider>
	);
};

export default RestCountries;
