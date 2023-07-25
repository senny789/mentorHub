import { selectUser, userState } from "@/store/features/msfUserReducer";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const index = () => {
	const userData = useSelector(selectUser);

	const userRow = userData.map((user: userState, index: number) => {
		return (
			<tr key={user.id} className=" border-b-2 hover:bg-slate-200 capitalize">
				<td className="p-4">{index + 1}</td>
				<td className="p-4">{user.personalInfo?.name}</td>
				<td className="p-4 normal-case">{user.personalInfo?.email}</td>
				<td className="p-4">{user.personalInfo?.phone}</td>
				<td className="p-4">{user.plan?.period}</td>
				<td className="p-4">{user.plan?.type}</td>
				<td className="p-4">{user.addons?.online ? "active" : "inactive"}</td>
				<td className="p-4">{user.addons?.storage ? "active" : "inactive"}</td>
				<td className="p-4">
					{user.addons?.customize ? "active" : "inactive"}
				</td>
				<td className="p-4">{user.totalCharge}</td>
			</tr>
		);
	});

	return (
		<motion.div
			initial={{
				opacity: 0.5,
			}}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.75,
				},
			}}
			className="w-screen h-screen p-8 bg-slate-950 text-white  overflow-scroll"
		>
			<motion.div
				initial={{
					y: 100,
				}}
				animate={{
					y: 0,
					transition: {
						duration: 0.5,
					},
				}}
				className="w-full lg:w-4/5 m-auto flex flex-col gap-8"
			>
				<section className="text-center flex justify-between  w-full items-center">
					<h1 className="text-3xl font-bold">User Subscriptions</h1>
					<Link
						href="/multi-step-form"
						className="bg-white text-black font-bold rounded-xl p-2 items-center hover:shadow-[0_0_5px_0_white]"
					>
						Add Subscription
					</Link>
				</section>
				<section className="w-full text-xl">
					<div className="multi-step-form border   overflow-x-scroll rounded-xl p-4 bg-white text-black shadow-[0_0_5px_0_white]">
						<table className="w-full">
							<thead className=" capitalize">
								<tr className="">
									<th>#</th>
									<th colSpan={3}>Personal Info</th>
									<th colSpan={2}>Plan</th>
									<th colSpan={3}>Addons</th>
									<th>
										total <br></br> charge
									</th>
								</tr>
								<tr>
									<th></th>
									<th>name</th>
									<th>email</th>
									<th>phone</th>
									<th>type</th>
									<th>period</th>
									<th>online</th>
									<th>storage</th>
									<th>customize</th>
								</tr>
							</thead>

							<tbody className="font-semibold">
								{userData.length > 0 ? (
									userRow
								) : (
									<tr>
										<th colSpan={9} className="p-4">
											<span className="flex flex-col gap-4 justify-center w-full">
												<h1 className="text-2xl">
													No user subscription found.
												</h1>
												<Link
													href="/multi-step-form"
													className="w-fit self-center bg-slate-800 rounded-md hover:shadow-[0_0_10px_0_rgb(30_41_59)] text-white p-2 shadow-md"
												>
													Add User Subscription
												</Link>
											</span>
										</th>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</motion.div>
		</motion.div>
	);
};

export default index;
