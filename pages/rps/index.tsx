import React, { useState } from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { motion } from "framer-motion";
const RockPaperScissors = () => {
	const [score, setScore] = useState(0);
	const [playing, setPlaying] = useState(false);
	return (
		<div
			className={`h-screen w-screen rps p-10 overflow-scroll flex justify-center `}
			style={{
				backgroundImage:
					"linear-gradient(hsl(214, 47%, 23%),hsl(237, 49%, 15%)",
				//
			}}
		>
			{playing ? (
				<motion.main
					initial={{
						opacity: 0,
					}}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="w-1/2 m-auto h-full"
				>
					<Head score={score} />
					<Body setScore={setScore} />
				</motion.main>
			) : (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className=" flex   items-center justify-center"
				>
					<div className=" flex flex-col  gap-4 font-bold text-3xl items-center justify-center">
						<h1>Welcome to Rock Paper Scissors</h1>
						<button
							className="bg-green-500 rounded-xl p-4 m-auto"
							onClick={() => setPlaying(true)}
						>
							Play
						</button>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default RockPaperScissors;
