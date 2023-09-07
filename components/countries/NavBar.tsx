import { ThemeContext } from "@/pages/rest-countries";
import React, { useContext } from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
const NavBar = () => {
	const [theme, setTheme] = useContext(ThemeContext);
	return (
		<nav className="w-full flex  justify-between p-8 shadow-xl">
			<h2 className="font-bold text-3xl">
				Where in the world you want to see ?
			</h2>
			<span
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="text-3xl px-8 cursor-pointer"
			>
				{theme === "dark" ? (
					<BsFillSunFill fill="white" />
				) : (
					<BsFillMoonStarsFill />
				)}
			</span>
		</nav>
	);
};

export default NavBar;
