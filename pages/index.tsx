import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import Map from "@/assets/leaflet/leaflet.jpg";
import Multi from "@/assets/multi-step-form/multistep.png";
import Rps from "@/assets/images/rps.png";
import Rest from "@/assets/rest-countries.png";
import { useRouter } from "next/router";

import { selectDemo, toggleDemoPage } from "@/store/features/homeReducers";
import { useDispatch, useSelector } from "react-redux";
import { useIsLarge, useIsSmall } from "@/hooks/useMatchMedia";
import DemoSection from "@/components/newhome/DemoSection";
import BgCard from "@/components/newhome/BgCard";

const index = () => {
	const demoState = useSelector(selectDemo);
	const dispatch = useDispatch();
	const [explore, setExplore] = useState(false);

	const [bgColor, setBgColor] = useState("");

	const ref = useRef(null);
	const isSmall = useIsSmall();
	const islarge = useIsLarge();

	const variants = {
		leaflet:
			isSmall && !islarge
				? {
						animate: {
							top: explore ? "-10%" : "0%",
							left: explore ? "-10%" : "-50%",
						},
				  }
				: {
						initial: { top: "-10%", left: "-10%" },
						animate: {
							top: explore ? "5%" : "10%",
							left: explore ? "-15%" : "-5%",
						},
				  },
		rps:
			isSmall && !islarge
				? {
						initial: { bottom: "-10%", right: "0%" },
						animate: {
							bottom: explore ? "-10%" : "0%",
							right: explore ? "-20%" : "-50%",
						},
				  }
				: {
						initial: { bottom: "-10%", right: "20%" },
						animate: {
							bottom: explore ? "-10%" : "0%",
							right: explore ? "-15%" : "-10%",
						},
				  },
		countries: {
			initial: { bottom: "-40%", left: "-40%" },
			animate: {
				bottom: explore ? "-10%" : "-5%",
				left: explore ? "-5%" : "0%",
			},
		},
		formik: {
			initial: { top: "-20%", right: "-5%" },
			animate: {
				top: explore ? "-15%" : "-10%",
				right: explore ? "-5%" : "0%",
			},
		},
	};

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
					"h-screen w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth " +
					bgColor
				}
			>
				<span
					className={`font-bold z-10 text-xl p-2 flex justify-between fixed top-4 left-4 right-4 ${
						bgColor === "bg-gray-200" ? "text-black" : "text-white"
					}`}
				>
					<h1 className="">
						Frontend Mentor Hub by{" "}
						<a
							href="https://senny.netlify.app"
							className="hover:underline cursor-pointer"
						>
							{" "}
							senny.
						</a>
					</h1>
					<ul className="lg:flex gap-2 hidden">
						<a href="#leaflet" className="hover:underline">
							Leaflet
						</a>
						<a href="#formik" className="hover:underline">
							Formik
						</a>
						<a href="#rps" className="hover:underline">
							Rock-Paper-Scissors
						</a>
						<a href="#countries" className="hover:underline">
							Countries
						</a>
					</ul>
				</span>
				<span
					className={`font-bold text-sm md:text-md p-2 flex lg:hidden justify-between fixed bottom-4 left-4 ${
						bgColor === "bg-gray-200" ? "text-black" : "text-white"
					}`}
				>
					<ul className="flex gap-2">
						<a href="#leaflet" className="hover:underline">
							Leaflet
						</a>
						<a href="#formik" className="hover:underline">
							Formik
						</a>
						<a href="#rps" className="hover:underline">
							Rock-Paper-Scissors
						</a>
						<a href="#countries" className="hover:underline">
							Countries
						</a>
					</ul>
				</span>
				<DemoSection
					route={"/leaflet"}
					key="leaflet"
					color="bg-blue-500"
					setBgColor={setBgColor}
					id={"leaflet"}
					title="Leaflet"
					img={Map.src}
					content="This is a section where i implemented leaflet and weather api to find the weather and map details of specific places when searched"
				></DemoSection>
				<DemoSection
					route={"rest-countries"}
					key="countries"
					color="bg-gray-200"
					id={"countries"}
					setBgColor={setBgColor}
					title="Countries"
					img={Rest.src}
					content="This is a section where i implemented infinite scrolling ,theme change,filter and Countries api to display the countries of the world"
				></DemoSection>
				<DemoSection
					route={"rps"}
					key="rps"
					color="bg-blue-900"
					setBgColor={setBgColor}
					id="rps"
					title="Rock Paper Scissors!"
					img={Rps.src}
					content="This is a section where i made a simple rock paper scissors game."
				></DemoSection>
				<DemoSection
					route={"multi-step-form/dashboard"}
					key="formik"
					color="bg-slate-400"
					setBgColor={setBgColor}
					id={"formik"}
					title="Formik"
					img={Multi.src}
					content="This is a section where i implemented redux ,formik and yup  to add users with the details in the form provided by the frontend mentor hub challenge."
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
				className="relative h-screen w-screen overflow-hidden p-4 bg-stone-100"
			>
				<h1 className="font-bold text-xl">Frontend Mentor Hub by senny.</h1>

				<AnimatePresence>
					{!demoState && (
						<motion.span
							key="home"
							exit={{ opacity: 0, transition: { duration: 1 } }}
						>
							<BgCard
								route={"/leaflet"}
								imgsrc={Map.src}
								initial={"initial"}
								animate={"animate"}
								variants={variants.leaflet}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>

							<BgCard
								imgsrc={Multi.src}
								route={"multi-step-form/dashboard"}
								initial={"initial"}
								variants={variants.formik}
								animate={"animate"}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>

							<BgCard
								imgsrc={Rps.src}
								route={"rps"}
								variants={variants.rps}
								initial={"initial"}
								animate={"animate"}
								transition={{
									duration: 2,
									ease: "easeInOut",
								}}
								style=""
							/>
							<BgCard
								imgsrc={Rest.src}
								variants={variants.countries}
								route={"rest-countries"}
								initial={"initial"}
								animate={"animate"}
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
											className="text-5xl lg:text-8xl font-bold text-gray-700 cursor-pointer z-20 absolute"
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
											className="text-5xl lg:text-8xl font-bold text-gray-700 cursor-pointer z-20 absolute"
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
											className="  text-5xl lg:text-8xl font-bold text-red-500 cursor-pointer z-20 absolute "
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
										left: "35%",
										opacity: 1,

										transition: {
											delay: 0.75,
											duration: 1,
										},
									}}
									className="text-5xl lg:text-8xl font-bold text-green-400 cursor-pointer z-20 absolute "
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
