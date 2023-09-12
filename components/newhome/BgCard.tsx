import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const BgCard = ({
	imgsrc,
	style,
	initial,
	animate,
	transition,
	variants,
	route,
}: any) => {
	const router = useRouter();
	return (
		<motion.span
			initial={initial}
			animate={animate}
			variants={variants}
			transition={transition}
			onClick={() => router.push(route)}
			className={
				"aspect-video rounded-2xl w-[400px] lg:h-[350px] lg:w-[650px] shadow-[0px_1px_20px_0px_gray] overflow-hidden  absolute hover:blur-0 cursor-pointer  blur-[2px]" +
				style
			}
		>
			<motion.div
				initial={{
					opacity: 1,
				}}
				animate={{
					opacity: 0,
				}}
				transition={{
					delay: 1,
					duration: 3,
					ease: "linear",
				}}
				className="bg-slate-200 z-10 rounded-2xl absolute -inset-1 hover:opacity-0   "
				style={{
					transition: "0.75s all ",
					transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
				}}
			></motion.div>
			<img src={imgsrc} alt={"photo"} className=" h-full w-full "></img>
		</motion.span>
	);
};
export default BgCard;
