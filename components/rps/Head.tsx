import React from "react";

const Head = ({ score }: { score: number }) => {
	return (
		<header className="border border-10-white rounded-xl p-4 flex flex-col  gap-4 lg:flex-row justify-between items-center mb-8 min-w-fit">
			<h1 className="text-2xl lg:text-4xl font-semibold flex  gap-2 lg:flex-col ">
				<span>Rock</span>
				<span>Paper</span>
				<span>Scissors</span>
			</h1>
			<span className="bg-white p-4 rounded-xl w-fit">
				<p className="text-[hsl(229,64%,46%)] font-semibold text-xl">SCORE</p>
				<h1 className="text-[hsl(229,25%,31%)] text-5xl font-bold">{score}</h1>
			</span>
		</header>
	);
};

export default Head;
