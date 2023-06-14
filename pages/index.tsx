import Image from "next/image";
import { Inter } from "next/font/google";
import Map from "@/assets/leaflet/MapDemo.png";
import Multi from "@/assets/multi-step-form/multistep.png";
import Rps from "@/assets/images/rps.png";
import Rest from "@/assets/rest-countries.png";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const inter = Inter({ subsets: ["latin"] });
const ProjectSection = ({ color, route, img, imgAlt, title }: any) => {
	const ref = useRef(null);
	const inView = useInView(ref);
	const router = useRouter();
	return (
		<div className={`${color} min-h-screen w-screen snap-start `}>
			<div className="flex flex-col items-center h-screen justify-center">
				<div
					ref={ref}
					style={{
						transform: inView ? "none" : "translateX(200px)",
						opacity: inView ? 1 : 0,
						transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
					}}
					className=" w-1/2  flex flex-col gap-10 cursor-pointer"
					onClick={() => router.push(route)}
				>
					<img
						src={img}
						alt={imgAlt}
						className="aspect-video rounded-xl w-full shadow-[1px_1px_20px_4px_black] hover:scale-[110%] transition-all  hover:opacity-90 "
					></img>
					<h1 className="text-2xl font-bold text-center">{title}</h1>
				</div>
			</div>
		</div>
	);
};
export default function Home() {
	return (
		<motion.div
			className="max-h-[100dvh] overflow-scroll snap-y snap-mandatory  text-white "
			key={"home"}
			exit={{ opacity: 0, x: -100 }}
		>
			<div className="title font-bold text-2xl capitalize fixed  w-full ">
				<h1 className=" text-center ">
					hello welcome to my frontend mentor hub
				</h1>
			</div>
			<ProjectSection
				color={"bg-red-700"}
				route={"/leaflet"}
				img={Map.src}
				imgAlt={"map"}
				title={"Playing around with Leaflet"}
			/>

			<ProjectSection
				color={"bg-gray-500"}
				route={"multi-step-form"}
				img={Multi.src}
				imgAlt="Multi Step Form"
				title={"A Custom MultiStep Form with Formik and yup implementation"}
			/>
			<ProjectSection
				color={"bg-blue-950"}
				route="rps"
				img={Rps.src}
				imgAlt="Rock Paper Scissors"
				title={"A game of Rock Paper Scissors with Senny"}
			/>
			<span className="text-black">
				<ProjectSection
					color="bg-white"
					route="rest-countries"
					img={Rest.src}
					imgAlt="Rest Countries"
					title={
						"A App to search filter and see the details of countries of the world"
					}
				/>
			</span>
		</motion.div>
	);
}
