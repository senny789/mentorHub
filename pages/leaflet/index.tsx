import React from "react";
import App from "./App";
import { motion } from "framer-motion";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const LeafletHome = () => {
	React.useEffect(() => {
		const L = require("leaflet");
		let DefaultIcon = L.icon({
			iconUrl: icon.src,
			shadowUrl: iconShadow.src,
		});

		L.Marker.prototype.options.icon = DefaultIcon;
	}, []);
	return (
		<motion.div transition={{ duration: 1 }}>
			<App />
		</motion.div>
	);
};

export default LeafletHome;
