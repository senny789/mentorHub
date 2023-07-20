import React, { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useInView,
	useScroll,
	useSpring,
} from "framer-motion";
import ReactImg from "../../assets/react.png";
import Map from "@/assets/leaflet/MapDemo.png";
import Multi from "@/assets/multi-step-form/multistep.png";
import Rps from "@/assets/images/rps.png";
import Rest from "@/assets/rest-countries.png";
import { useRouter } from "next/router";
import { AiOutlineArrowUp } from "react-icons/ai";
import { selectDemo, toggleDemoPage } from "@/store/features/homeReducers";
import { useDispatch, useSelector } from "react-redux";
const Bubble = ({ img }: any) => {
	return (
		<motion.div
			className="rounded-full border border-blue-100  h-10 w-10"
			animate={{
				rotateZ: 360,
			}}
			transition={{
				duration: 3,
				ease: "linear",
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 0,
			}}
			style={{
				backgroundImage: `url(${img})`,
				backgroundSize: "cover",
			}}
		></motion.div>
	);
};
const BgCard = ({ imgsrc, style, initial, animate, transition }: any) => {
	return (
		<motion.span
			initial={initial}
			animate={animate}
			transition={transition}
			className={
				"aspect-video rounded-2xl h-[350px] w-[650px] shadow-[0px_1px_20px_0px_gray] overflow-hidden  absolute " +
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
				className="bg-slate-200 z-10 rounded-2xl absolute -inset-1 hover:opacity-0  blur-[2px] "
				style={{
					transition: "0.75s all ",
					transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
				}}
			></motion.div>
			<img
				src={imgsrc}
				alt={"photo"}
				className=" h-full w-full blur-[2px]"
			></img>
		</motion.span>
	);
};
const DemoSection = ({
	title,
	content,
	img,
	color,
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
			className="flex h-screen w-screen snap-center mt-10 items-center cursor-pointer "
			onClick={() => router.push(route)}
		>
			<motion.span
				initial={{
					x: -700,
				}}
				whileInView={{
					x: -100,
					transition: {
						duration: 1,
					},
				}}
				className={
					"aspect-video rounded-2xl h-[70vh] w-[60vw]  overflow-hidden relative shadow-2xl  "
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
					y: 200,
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
				<motion.h1 className="text-3xl font-bold ">{title}</motion.h1>
				<motion.p className="w-4/5 text-center font-bold ">{content}</motion.p>
			</motion.span>
		</motion.span>
	);
};
const index = () => {
	const demoState = useSelector(selectDemo);
	const dispatch = useDispatch();
	const [explore, setExplore] = useState(false);
	const [demo, setDemo] = useState(false);
	const [bgColor, setBgColor] = useState("");
	const router = useRouter();
	const ref = useRef(null);

	// const { scrollYProgress } = useScroll({
	// 	container: ref,
	// });
	// const scaleX = useSpring(scrollYProgress, {
	// 	stiffness: 100,
	// 	damping: 30,
	// 	restDelta: 0.001,
	// });
	if (demoState) {
		return (
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
					transition: { duration: 1 },
				}}
				ref={ref}
				className={
					"h-screen w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory " +
					bgColor
				}
			>
				{/* <motion.div
					className="fixed top-0 left-0 right-0 h-[10px] bg-white origin-[0%]"
					style={{ scaleX }}
				></motion.div> */}
				<h1 className="font-bold text-xl p-2 fixed top-4 left-4">
					Frontend Mentor Hub by senny.
				</h1>
				<DemoSection
					route={"/leaflet"}
					key="leaflet"
					color="bg-red-600"
					setBgColor={setBgColor}
					title="Leaflet"
					img={Map.src}
					content="This is a section where i implemented leaflet and weather api to find the weather and map details of specific places when searched"
				></DemoSection>

				<DemoSection
					route={"multi-step-form"}
					key="formik"
					color="bg-slate-400"
					setBgColor={setBgColor}
					title="Formik"
					img={Multi.src}
					content="This is a section where i implemented leaflet and weather api to find the weather and map details of specific places when searched"
				></DemoSection>

				<DemoSection
					route={"rps"}
					key="rps"
					color="bg-blue-900"
					setBgColor={setBgColor}
					title="Rock Paper Scissors!"
					img={Rps.src}
					content="This is a section where i implemented leaflet and weather api to find the weather and map details of specific places when searched"
				></DemoSection>

				<DemoSection
					route={"rest-countries"}
					key="countries"
					color="bg-gray-200	"
					setBgColor={setBgColor}
					title="Countries"
					img={Rest.src}
					content="This is a section where i implemented leaflet and weather api to find the weather and map details of specific places when searched"
				></DemoSection>
			</motion.div>
		);
	}
	return (
		<AnimatePresence key="home">
			<motion.div
				onClick={() => setExplore(!explore)}
				exit={{
					opacity: 0,
					transition: {
						duration: 1,
						ease: "easeInOut",
					},
				}}
				className="relative h-screen w-screen overflow-hidden p-4 cursor-pointer bg-stone-100"
			>
				<h1 className="font-bold text-xl">Frontend Mentor Hub by senny.</h1>
				{/* <span className="absolute top-[10%] right-[45%]">
					<Bubble img={ReactImg.src} />
				</span>
				<motion.span
					initial={{
						top: "8%",
						right: "47%",
					}}
					animate={{
						top: ["8%", "13%", "8%"],
						right: ["47%", "44.5%", "47%"],
					}}
					transition={{
						duration: 3,
						ease: "linear",
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 0,
					}}
					className="absolute   bg-blue-300 h-3 w-3 rounded-full"
				></motion.span>
				<motion.span
					initial={{
						top: "8%",
						right: "45%",
					}}
					animate={{
						top: "15%",
						right: "46%",
					}}
					transition={{
						duration: 2,
						ease: "linear",
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 0,
					}}
					className="absolute   bg-blue-300 h-3 w-3 rounded-full"
				></motion.span> */}
				<AnimatePresence>
					{!demo && (
						<motion.span
							key="home"
							exit={{ opacity: 0, transition: { duration: 1 } }}
						>
							<BgCard
								imgsrc={Map.src}
								initial={{ top: "-10%", left: "-10%" }}
								animate={{
									top: explore ? "-10%" : "10%",
									left: explore ? "-10%" : "4%",
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>

							<BgCard
								imgsrc={Multi.src}
								initial={{ top: "-20%", right: "-5%" }}
								animate={{
									top: explore ? "-40%" : "-20%",
									right: explore ? "-10%" : "0%",
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>

							<BgCard
								imgsrc={Rps.src}
								initial={{ bottom: "-10%", right: "20%" }}
								animate={{
									bottom: explore ? "-10%" : "0%",
									right: explore ? "-20%" : "-10%",
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>
							<BgCard
								imgsrc={Rest.src}
								initial={{ bottom: "-40%", left: "-40%" }}
								animate={{
									bottom: explore ? "-30%" : "-20%",
									left: explore ? "-10%" : "0%",
								}}
								transition={{
									duration: 1,
								}}
								style=""
							/>
							<AnimatePresence>
								{!explore && (
									<motion.span
										exit={{
											opacity: 0,
											transition: {
												duration: 1,
												ease: "easeOut",
											},
										}}
									>
										{" "}
										<motion.h1
											initial={{
												bottom: 0,
												left: "35%",
												opacity: 0,
											}}
											animate={{
												top: "35%",
												left: "35%",
												opacity: 1,
												transition: {
													duration: 1,
												},
											}}
											className="text-8xl font-bold text-gray-700 cursor-pointer z-20 absolute"
										>
											Welcome
										</motion.h1>
										<motion.h1
											initial={{
												bottom: "-20%",
												left: "35%",
												opacity: 0,
											}}
											animate={{
												top: "50%",
												left: "40%",
												opacity: 1,

												transition: {
													delay: 0.5,
													duration: 1,
												},
											}}
											className="text-8xl font-bold text-gray-700 cursor-pointer z-20 absolute"
										>
											To My
										</motion.h1>
										<motion.h1
											initial={{
												bottom: "-20%",
												left: "20%",
												opacity: 0,
											}}
											animate={{
												top: "65%",
												left: "20%",
												opacity: 1,

												transition: {
													delay: 0.75,
													duration: 1,
												},
											}}
											className="text-8xl font-bold text-red-500 cursor-pointer z-20 absolute "
										>
											Frontend Mentor Hub.
										</motion.h1>
									</motion.span>
								)}
							</AnimatePresence>

							{explore && (
								<motion.span
									onClick={(e) => {
										e.stopPropagation();
										// setDemo(true);
										dispatch(toggleDemoPage());
									}}
									initial={{
										bottom: "-20%",
										left: "40%",
										opacity: 0,
									}}
									animate={{
										top: "45%",
										left: "40%",
										opacity: 1,

										transition: {
											delay: 0.75,
											duration: 1,
										},
									}}
									className="text-8xl font-bold text-green-400 cursor-pointer z-20 absolute "
								>
									Explore!
								</motion.span>
							)}
						</motion.span>
					)}
				</AnimatePresence>
			</motion.div>
		</AnimatePresence>
	);
};

export default index;
