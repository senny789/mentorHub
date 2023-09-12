import React, { useEffect, useMemo, useState } from "react";
import image from "@/assets/images/bg-triangle.svg";
import rock from "@/assets/images/icon-rock.svg";
import paper from "@/assets/images/icon-paper.svg";
import scissors from "@/assets/images/icon-scissors.svg";
import { motion } from "framer-motion";
import Image from "next/image";
type Signs = "rock" | "paper" | "scissors" | "";
const Sign = ({ type }: { type: string }) => {
	const bgColorLight =
		type === "rock"
			? "bg-red-600"
			: type === "paper"
			? "bg-blue-600"
			: "bg-yellow-600";
	const bgColorDark =
		type === "rock"
			? "bg-red-800"
			: type === "paper"
			? "bg-blue-800"
			: "bg-yellow-800";
	const imageType =
		type === "rock" ? rock : type === "paper" ? paper : scissors;
	return (
		<div
			className={`${bgColorDark} rounded-[100%] aspect-square lg:w-[200px] w-[100px] relative overflow-hidden cursor-pointer hover:opacity-[0.5]`}
		>
			<div
				className={`${bgColorLight} rounded-[100%] aspect-square w-[100%]  absolute -top-2  flex justify-center items-center`}
			>
				<div className="bg-gray-600 w-[80%] rounded-[100%] absolute flex justify-center items-center aspect-square pt-4 overflow-hidden">
					<div className="w-[100%] rounded-full aspect-square bg-white text-black   flex justify-center items-center">
						<Image
							src={imageType.src}
							alt="sign"
							className="aspect-square m-auto lg:w-[100px] w-[50px]"
						></Image>
					</div>
				</div>
			</div>
		</div>
	);
};
const SelectionScreen = ({
	setSelected,
}: {
	setSelected: (val: Signs) => void;
}) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="relative w-full h-[40%] lg:h-[80%] z-1 grid grid-cols-3"
			style={{
				backgroundImage: `url(${image.src})`,
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<span className="relative">
				<span
					className="absolute -top-4 -left-10 lg:left-0 lg:-top-2"
					onClick={() => setSelected("rock")}
				>
					<Sign type="rock" />
				</span>
			</span>
			<span></span>
			<span className="relative">
				<span
					className="absolute -top-2 -right-10 lg:right-0 "
					onClick={() => setSelected("paper")}
				>
					<Sign type="paper" />
				</span>
			</span>
			<span></span>
			<span className="relative">
				<span
					className="absolute 
          lg:left-8 -left-8
          bottom-0"
					onClick={() => setSelected("scissors")}
				>
					<Sign type="scissors" />
				</span>
			</span>
			<span></span>
		</motion.div>
	);
};
const PlayingScreen = ({
	selected,
	setScore,
	setSelected,
	sennySign,
	status,
}: {
	status: string;
	sennySign: string;
	selected: Signs;
	setSelected: (val: Signs) => void;
	setScore: (val: any) => void;
}) => {
	return (
		<motion.div
			className="w-full  mt-20 flex justify-center items-center"
			initial={{
				opacity: 0,
			}}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
		>
			<div className="flex gap-15  m-auto z-1">
				<section className="flex flex-col gap-10 items-center">
					<h1 className="text-2xl text-white font-bold">You Picked</h1>
					<Sign type={selected} />
				</section>
				<section className="flex flex-col gap-10 justify-center items-center p-5">
					<h1 className="text-xl lg:text-3xl text-white font-bold">
						You {status}
					</h1>
					<button
						className={`bg-slate-200 rounded-xl text-xl py-2 px-6 lg:px-16 font-bold ${
							status === "Won" ? "text-green-400" : "text-red-400"
						}`}
						onClick={() => setSelected("")}
					>
						Play Again
					</button>
				</section>
				<section className="flex flex-col gap-10 items-center">
					<h1 className="text-2xl text-white font-bold">Senny Picked</h1>
					<Sign type={sennySign} />
				</section>
			</div>
		</motion.div>
	);
};
const Body = ({ setScore }: { setScore: (val: any) => void }) => {
	const [selected, setSelected] = useState<Signs>("");
	const sennySign = useMemo(
		() => ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)],
		[selected]
	);

	const [status, setStatus] = useState("");
	const scoreChanger = () => {
		switch (selected) {
			case "rock":
				switch (sennySign) {
					case "rock":
						setStatus("Draw");
						setScore((sc: number) => sc);
						return;
					case "paper":
						setStatus("Lose");
						setScore((sc: number) => {
							return sc - 1;
						});
						return;
					case "scissors":
						setStatus("Won");
						setScore((sc: number) => {
							return sc + 1;
						});
						return;
				}
				break;
			case "paper":
				switch (sennySign) {
					case "rock":
						setStatus("Won");
						setScore((sc: number) => {
							return sc + 1;
						});
						return;
					case "paper":
						setStatus("Draw");
						return;
					case "scissors":
						setStatus("Lose");
						setScore((sc: number) => {
							return sc - 1;
						});
						return;
				}
				break;
			case "scissors":
				switch (sennySign) {
					case "rock":
						setStatus("Lose");
						setScore((sc: number) => {
							return sc - 1;
						});
						return;
					case "paper":
						setStatus("Won");
						setScore((sc: number) => {
							return sc + 1;
						});
						return;
					case "scissors":
						setStatus("Draw");
						return;
				}
				break;
		}
	};
	useEffect(() => {
		if (selected !== "") {
			scoreChanger();
		}
	}, [selected]);
	return selected === "" ? (
		<SelectionScreen setSelected={setSelected} />
	) : (
		<PlayingScreen
			status={status}
			sennySign={sennySign}
			selected={selected}
			setSelected={setSelected}
			setScore={setScore}
		/>
	);
};

export default Body;
