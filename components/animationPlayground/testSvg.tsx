import React from "react";
import { motion } from "framer-motion";
const TestSvg = () => {
	const icon = {
		hidden: {
			pathLength: 0,
			fill: "rgba(255, 255, 255, 0)",
		},
		visible: {
			pathLength: 1,
			fill: "rgba(255, 0, 255, 1)",
		},
	};
	return (
		<svg
			width="4268"
			height="1535"
			viewBox="0 0 4268 1535"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<motion.path
				d="M1293 197L2 1165.5L4266.5 1534L3863 1L2203.5 1349.5L1293 197Z"
				stroke="black"
				variants={icon}
				initial="hidden"
				animate="visible"
				transition={{
					duration: 1,
				}}
			/>
		</svg>
	);
};

export default TestSvg;
