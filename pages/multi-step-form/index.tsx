import React, { useMemo, useState } from "react";

import BgDesktop from "./components/svgComponents/BgDesktop";

import Personal, { formValue } from "./components/formComponents/personal";
import Plan from "./components/formComponents/plan";
import Addon from "./components/formComponents/addon";
import Summary from "./components/formComponents/summary";
import Thanks from "./components/svgComponents/thanks";
import FormProgress from "./components/FormProgress";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

export type form = "personal" | "plan" | "addon" | "summary" | "end";
export type plan = "arcade" | "advanced" | "pro";
export type period = "yearly" | "monthly";
export type addon = "online" | "storage" | "profile";
const MultiStepForm = () => {
  const [currentForm, setCurrentForm] = useState<form>("personal");
  const [plan, setPlan] = useState<plan>("arcade");
  const [period, setPeriod] = useState<period>("monthly");
  const [addon, setAddon] = useState<addon[] | null>([]);
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
          </div>
        );
    }
  };

  const handleFormChange = (type: string) => {
    if (type === "next") {
      if (currentForm === "personal") {
        formik.handleSubmit();
        if (Object.keys(formik.errors).length > 0) {
          return;
        }
        if (formik.isSubmitting) {
          setCurrentForm("plan");
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
    <div className="flex h-screen w-screen justify-center bg-slate-300 items-center">
      <div className="min-h-[75%] w-[80%] bg-white rounded-md p-10">
        <div className="flex  gap-10">
          <div className="flex flex-grow-[0.7] flex-col list-none relative isolate rounded-xl  p-10 gap-8">
            <BgDesktop className="absolute -z-[1] inset-0" />
            <FormProgress currentForm={currentForm} />
          </div>
          <div className="z-10 flex-auto  p-10">
            {formRender()}
            {currentForm !== "end" && (
              <>
                <div
                  id="button"
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
                      onClick={() => handleFormChange("next")}
                      className="next bg-black  text-white px-6 py-3 rounded-md"
                    >
                      Next Step
                    </button>
                  )}
                  {currentForm === "summary" && (
                    <button
                      onClick={() => setCurrentForm("end")}
                      className="next bg-[hsl(243,100%,62%)] text-white px-6 py-3 rounded-md"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
