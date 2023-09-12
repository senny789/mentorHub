import React, { useMemo, useState } from "react";

import BgDesktop from "../../components/multistepform/svgComponents/BgDesktop";

import Personal, {
	formValue,
} from "../../components/multistepform/formComponents/personal";
import Plan from "../../components/multistepform/formComponents/plan";
import Addon from "../../components/multistepform/formComponents/addon";
import Summary from "../../components/multistepform/formComponents/summary";
import Thanks from "../../components/multistepform/svgComponents/thanks";
import FormProgress from "../../components/multistepform/FormProgress";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/features/msfUserReducer";

import Link from "next/link";
import { motion } from "framer-motion";
export type form = "personal" | "plan" | "addon" | "summary" | "end";
export type plan = "arcade" | "advanced" | "pro";
export type period = "yearly" | "monthly";
export type addon = "online" | "storage" | "profile";
const MultiStepForm = () => {
	const [currentForm, setCurrentForm] = useState<form>("personal");
	const [plan, setPlan] = useState<plan>("arcade");
	const [period, setPeriod] = useState<period>("monthly");
	const [addon, setAddon] = useState<addon[] | null>([]);
	const [total, setTotal] = useState(0);
	const formik: FormikProps<formValue> = useFormik<formValue>({
		initialValues: {
			name: "",
			email: "",
			phone: 0,
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, "Too Short!")
				.max(50, "Too Long!")
				.required("Required"),
			email: Yup.string().email("Invalid email").required("Required"),
			phone: Yup.number()
				.min(10, "Enter correct phone number!")
				.typeError("Phone number must be a number")
				.required("Required"),
		}),
		onSubmit: (values) => {
			//   alert(JSON.stringify(values, null, 2));
		},
	});
	const formRender = () => {
		switch (currentForm) {
			case "personal":
				return <Personal formik={formik} />;
			case "plan":
				return (
					<Plan
						plan={plan}
						period={period}
						setPlan={setPlan}
						setPeriod={setPeriod}
					/>
				);
			case "addon":
				return <Addon addon={addon} setAddon={setAddon} period={period} />;
			case "summary":
				return (
					<Summary
						total={total}
						setTotal={setTotal}
						plan={plan}
						period={period}
						addon={addon}
						setCurrentForm={setCurrentForm}
					/>
				);
			case "end":
				return (
					<div
						id="thanks"
						className=" mt-14 text-center flex flex-col justify-center items-center h-full gap-6 w-[80%] m-auto p-10"
					>
						<Thanks />
						<h1 className="font-bold text-3xl">Thank you!</h1>
						<p className="text-slate-400">
							Thanks for confirming your subscription! We hope you have fun
							using our platform. If you ever need support, please feel free to
							email us at support@loremgaming.com
						</p>
						<Link href="/multi-step-form/dashboard">Back to dashboard</Link>
					</div>
				);
		}
	};
	const dispatch = useDispatch();
	const userData = {
		personalInfo: formik.values,
		plan: {
			type: plan,
			period: period,
		},
		addons: {
			online: addon?.includes("online"),
			storage: addon?.includes("storage"),
			customize: addon?.includes("profile"),
		},
		totalCharge: total,
	};

	const handleFormChange = (type: string) => {
		if (type === "next") {
			if (currentForm === "personal") {
				formik.handleSubmit();

				if (Object.keys(formik.errors).length > 0) {
					return;
				} else if (!(Object.keys(formik.touched).length > 0)) {
					return;
				} else {
					setCurrentForm((curr) => "plan");
				}
			} else {
				setCurrentForm((form) => {
					switch (form) {
						case "plan":
							return "addon";
						case "addon":
							return "summary";
						case "summary":
							return "end";
						default:
							return "personal";
					}
				});
			}
		} else if (type === "prev") {
			setCurrentForm((form) => {
				switch (form) {
					case "plan":
						return "personal";
					case "addon":
						return "plan";
					case "summary":
						return "addon";
					default:
						return "personal";
				}
			});
		}
	};

	return (
		<div className="flex h-screen w-screen justify-center bg-slate-300 items-center overflow-scroll">
			<motion.div
				initial={{
					x: -100,
					opacity: 0,
				}}
				animate={{
					x: 0,
					opacity: 1,
					transition: {
						duration: 0.5,
					},
				}}
				className="  md:h-[max('fit-content',80%)] md:w-[70%]  flex p-8 gap-8 flex-col md:flex-row w-full bg-white rounded-md "
			>
				<div className=" relative w-full lg:w-1/3  flex-shrink-0 basis-[25%]   rounded-xl">
					<BgDesktop className="absolute top-0 left-0 -z-0 h-full w-full rounded-xl object-cover lg:rotate-0 rotate-180" />

					<FormProgress currentForm={currentForm} />
				</div>
				<div className="z-10 w-full">
					{formRender()}
					{currentForm !== "end" && (
						<>
							<div
								style={{
									justifyContent:
										currentForm === "personal" ? "flex-end" : "space-between",
								}}
								className="flex   w-full mt-16"
							>
								{currentForm !== "personal" && (
									<button
										onClick={() => handleFormChange("prev")}
										className="back text-gray-400 px-6 py-3 rounded-md"
									>
										Go back
									</button>
								)}
								{currentForm !== "summary" && (
									<button
										type="button"
										onClick={() => handleFormChange("next")}
										className="next bg-black  text-white px-6 py-3 rounded-md"
									>
										Next Step
									</button>
								)}
								{currentForm === "summary" && (
									<button
										onClick={() => {
											dispatch(addUser(userData));
											setCurrentForm("end");
										}}
										className="next bg-[hsl(243,100%,62%)] text-white px-6 py-3 rounded-md"
									>
										Confirm
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default MultiStepForm;
