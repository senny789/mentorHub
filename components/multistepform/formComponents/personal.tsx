import { FormikProps } from "formik";
import React from "react";
export type formValue = {
	name: string;
	email: string;
	phone: number;
};
const Personal = ({ formik }: { formik: FormikProps<formValue> }) => {
	return (
		<form id="info" className="  flex flex-col  gap-4">
			<h1 className="text-3xl font-bold">Personal info</h1>
			<h2 className=" font-medium text-slate-400">
				Please provide your name, emall address, and phone number.
			</h2>
			<span className="flex flex-col">
				<label htmlFor="name">Name</label>
				<input
					className={`border p-4 rounded-md ${
						formik?.errors.name && formik?.touched.name ? "border-red-500" : ""
					}`}
					id="name"
					placeholder="e.g. Stephen King"
					name="name"
					type={"text"}
					onChange={formik?.handleChange}
					value={formik?.values.name}
					onBlur={formik?.handleBlur}
				/>
				{formik?.touched.name && formik?.errors.name ? (
					<div className=" text-red-500 ">{formik?.errors.name}</div>
				) : null}
			</span>
			<span className="flex flex-col">
				<label htmlFor="email">Email Address</label>
				<input
					className={`border p-4 rounded-md ${
						formik?.errors.email && formik?.touched.email
							? " border-red-500"
							: ""
					}`}
					placeholder="e.g. stephenking@lorem.com"
					id="email"
					name="email"
					onChange={formik?.handleChange}
					value={formik?.values.email}
					onBlur={formik?.handleBlur}
				></input>
				{formik?.touched.email && formik?.errors.email ? (
					<div className=" text-red-500 ">{formik?.errors.email}</div>
				) : null}
			</span>
			<span className="flex flex-col">
				<label htmlFor="phone">Phone Number</label>
				<input
					className={`border p-4 rounded-md ${
						formik?.errors.phone && formik?.touched.phone
							? "border-red-500"
							: ""
					}`}
					id="phone"
					placeholder="e.g. +1 234 567 890"
					name="phone"
					onChange={formik?.handleChange}
					value={formik?.values.phone}
					onBlur={formik?.handleBlur}
				></input>
				{formik?.touched.phone && formik?.errors.phone ? (
					<div className=" text-red-500 ">{formik?.errors.phone}</div>
				) : null}
			</span>
		</form>
	);
};

export default Personal;
