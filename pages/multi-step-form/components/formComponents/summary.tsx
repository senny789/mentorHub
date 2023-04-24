import React from "react";
import { addon, form, period, plan } from "../..";
interface SummaryProps {
  plan: plan;
  period: period;
  addon: addon[] | null;
  setCurrentForm: (val: form) => void;
}
const Summary: React.FC<SummaryProps> = ({
  plan,
  period,
  addon,
  setCurrentForm,
}) => {
  const cost = {
    plan: {
      arcade: {
        monthly: 9,
        yearly: 90,
      },
      advanced: {
        monthly: 12,
        yearly: 120,
      },
      pro: {
        monthly: 15,
        yearly: 150,
      },
    },
    addon: {
      online: {
        monthly: 1,
        yearly: 10,
      },
      storage: {
        monthly: 2,
        yearly: 20,
      },
      profile: {
        monthly: 2,
        yearly: 20,
      },
    },
  };
  const addonDesc = {
    online: "Online service",
    profile: "Customize Profile",
    storage: "Larger storage",
  };
  const total = addon?.reduce((prev, add) => {
    return cost.addon[add][period] + prev;
  }, cost.plan[plan][period]);
  return (
    <div id="finishing" className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Finishing up</h1>
      <h2 className=" font-medium text-slate-400">
        Double-check everything looks OK before confirming.
      </h2>
      <div className="grid grid-cols-1 gap-4 ">
        <div className=" bg-slate-100 p-5 rounded-md flex flex-col gap-6">
          <section className="font-bold flex justify-between">
            <div>
              <h1 className=" capitalize">
                {plan} ({period})
              </h1>
              <span
                onClick={() => setCurrentForm("plan")}
                className="underline hover:cursor-pointer text-slate-400"
              >
                Change
              </span>
            </div>
            <span>
              ${cost.plan[plan][period]}/{period === "monthly" ? "mth" : "yr"}
            </span>
          </section>
          <hr />
          <section className="text-slate-400 font-bold flex flex-col gap-6">
            {addon?.length! > 0 &&
              addon?.map((add) => {
                return (
                  <div className="flex justify-between">
                    <h1>{addonDesc[add]}</h1>

                    <span className="text-slate-600">
                      ${cost.addon[add][period]}/
                      {period === "monthly" ? "mth" : "yr"}
                    </span>
                  </div>
                );
              })}
          </section>
        </div>
        <div className="flex justify-between font-bold ">
          <h1 className="text-slate-400">
            Total(Per {period === "monthly" ? "mth" : "yr"})
          </h1>
          <span className="text-[hsl(243,100%,62%)]">
            ${total}/{period === "monthly" ? "mth" : "yr"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
