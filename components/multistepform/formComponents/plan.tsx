import React, { useState } from "react";
import { period, plan } from "../../../pages/multi-step-form";
import Advanced from "../svgComponents/Advanced";
import Arcade from "../svgComponents/Arcade";
import Pro from "../svgComponents/Pro";
interface PlanProps {
	plan: plan;
	period: period;
	setPlan: (val: plan) => void;
	setPeriod: (val: period) => void;
}
const Plan: React.FC<PlanProps> = ({ plan, period, setPlan, setPeriod }) => {
	const activePlanStyle = {
		backgroundColor: "hsl(231, 100%, 99%)",
		borderColor: "hsl(243, 100%, 62%)",
	};
	return (
		<div id="plan" className="z-10 flex flex-col   gap-4">
			<h1 className="text-4xl font-bold">Select your plan</h1>
			<h2 className=" font-medium text-slate-400">
				You have the option of monthly or yearly billing.
			</h2>
			<section className="grid grid-cols-3 min-h-[200px] gap-2">
				<span
					style={plan === "arcade" ? activePlanStyle : {}}
					onClick={() => setPlan("arcade")}
					className="flex flex-col justify-between  hover:cursor-pointer p-4 pr-5  border rounded-md"
				>
					<Arcade />
					<h1 id="Arcade" className=" font-bold  text-[hsl(228,36%,42%)]  mt-8">
						Arcade
					</h1>
					{period === "monthly" ? (
						<h2>$9/mo</h2>
					) : (
						<span>
							<h2 className="text-slate-400 font-bold">$90/yr</h2>
							<h3 className="">2 months free</h3>
						</span>
					)}
				</span>
				<span
					style={plan === "advanced" ? activePlanStyle : {}}
					onClick={() => setPlan("advanced")}
					className="flex flex-col justify-between  hover:cursor-pointer p-4 pr-5  border rounded-md"
				>
					<Advanced />

					<h1
						id="Advanced"
						className=" font-bold   text-[hsl(228,36%,42%)]  mt-8"
					>
						Advanced
					</h1>
					{period === "monthly" ? (
						<h2>$12/mo</h2>
					) : (
						<span>
							<h2 className=" font-bold text-slate-400">$120/yr</h2>
							<h3 className="">2 months free</h3>
						</span>
					)}
				</span>
				<span
					style={plan === "pro" ? activePlanStyle : {}}
					onClick={() => setPlan("pro")}
					className="flex flex-col justify-between hover:cursor-pointer p-4 pr-5  border rounded-md"
				>
					<Pro />
					<h1 id="Pro" className=" font-bold  text-[hsl(228,36%,42%)] mt-8">
						Pro
					</h1>
					{period === "monthly" ? (
						<h2>$15/mo</h2>
					) : (
						<span>
							<h2 className="text-slate-400 font-bold">$150/yr</h2>
							<h3 className="">2 months free</h3>
						</span>
					)}
				</span>
			</section>
			<span className="flex items-center gap-4 w-full justify-center bg-slate-200 p-2 rounded-md">
				<h1
					className={`font-bold ${period === "yearly" ? "text-gray-400" : ""}`}
				>
					Monthly
				</h1>
				<span
					style={{
						justifyContent: period === "yearly" ? "flex-end" : "",
					}}
					onClick={() => setPeriod(period === "yearly" ? "monthly" : "yearly")}
					className="bg-black min-h-[2rem] aspect-video  rounded-full flex items-center hover:cursor-pointer p-2"
				>
					<span
						style={{
							transitionProperty: "all",
							transitionDuration: "1",
						}}
						className="bg-white rounded-full h-6 w-6 "
					></span>
				</span>
				<h1
					className={`font-bold ${period === "monthly" ? "text-gray-400" : ""}`}
				>
					Yearly
				</h1>
			</span>
		</div>
	);
};

export default Plan;
