import React from "react";
import App from "./App";
import { motion } from "framer-motion";
const LeafletHome = () => {
	return (
		<motion.div transition={{ duration: 1 }}>
			<App />
		</motion.div>
	);
};

export default LeafletHome;
