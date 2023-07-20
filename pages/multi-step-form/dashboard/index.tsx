import { selectUser, userState } from "@/store/features/msfUserReducer";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const index = () => {
	const userData = useSelector(selectUser);

	const userRow = userData.map((user: userState) => {
		return (
			<tr key={user.id}>
				<td>{user.personalInfo?.name}</td>
				<td>{user.personalInfo?.email}</td>
				<td>{user.personalInfo?.phone}</td>
				<td>{user.plan?.period}</td>
				<td>{user.plan?.type}</td>
				<td>{user.addons?.online ? "active" : "inactive"}</td>
				<td>{user.addons?.storage ? "active" : "inactive"}</td>
				<td>{user.addons?.customize ? "active" : "inactive"}</td>
				<td>{user.totalCharge}</td>
			</tr>
		);
	});
	console.log(userData);
	return (
		<div className="w-full h-screen p-8 bg-slate-800 text-white">
			<header className="text-center flex justify-between  w-full items-center">
				<h1 className="text-3xl font-bold">User Subscriptions</h1>
				<Link
					href="/multi-step-form"
					className="bg-white text-black font-bold rounded-xl p-2 items-center hover:shadow-[0_0_5px_0_white]"
				>
					Subscription Add
				</Link>
			</header>
			<main className="w-full p-8 text-xl">
				<div className="multi-step-form border  w-4/5 m-auto rounded-xl p-4 bg-white text-black shadow-[0_0_5px_0_white]">
					<table className=" w-full">
						<thead className=" capitalize">
							<tr className="">
								<th colSpan={3}>Personal Info</th>
								<th colSpan={2}>Plan</th>
								<th colSpan={3}>Addons</th>
								<th>total</th>
							</tr>
							<tr>
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
						<tbody>{userData.length > 0 ? userRow : <tr></tr>}</tbody>
					</table>
				</div>
			</main>
		</div>
	);
};

export default index;
