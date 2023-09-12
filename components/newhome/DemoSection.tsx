import { useInView } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const DemoSection = ({
	title,
	content,
	img,
	color,
	id,
	setBgColor,
	route,
}: any) => {
	const ref = useRef(null);
	const inView = useInView(ref);
	const router = useRouter();
	useEffect(() => {
		if (inView) {
			setBgColor((col: any) => color);
		}
	}, [inView]);
	return (
		<motion.span
			ref={ref}
			id={id}
			className="flex flex-col lg:flex-row h-screen w-screen snap-center mt-10 p-10 gap-10 justify-center items-center cursor-pointer "
			onClick={() => router.push(route)}
		>
			<motion.span
				initial={{
					x: -200,
				}}
				whileInView={{
					x: 0,
					transition: {
						duration: 0.75,
					},
				}}
				className={
					"aspect-video rounded-2xl lg:h-[70vh] lg:w-[60vw]  overflow-hidden relative shadow-2xl  "
				}
			>
				<img
					src={img}
					alt={"photo"}
					className=" h-full w-full shadow-sm "
				></img>
			</motion.span>
			<motion.span
				initial={{
					y: 100,
					opacity: 0,
				}}
				whileInView={{
					y: 0,
					opacity: 1,
					transition: {
						delay: 0.5,
						duration: 1,
					},
				}}
				className={
					"flex justify-center flex-col items-center grow-0 " +
					`${title === "Countries" ? "text-black" : "text-white"}`
				}
			>
				<motion.h1 className="text-xl lg:text-2xl font-bold ">
					{title}
				</motion.h1>
				<motion.p className="w-4/5  text-center font-bold ">{content}</motion.p>
			</motion.span>
		</motion.span>
	);
};

export default DemoSection;
