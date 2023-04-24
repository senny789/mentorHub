import React from "react";
import { addon, period } from "../..";
interface AddonProps {
  period: period;
  addon: addon[] | null;
  setAddon: (val: addon[]) => void;
}
const Addon = ({ period, addon, setAddon }: AddonProps) => {
  const activeAddonStyle = {
    backgroundColor: "hsl(231, 100%, 99%)",
    borderColor: "hsl(243, 100%, 62%)",
  };
  return (
    <div id="addon" className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Pick add-ons</h1>
      <h2 className=" font-medium text-slate-400">
        Add-ons help enhance your gaming experience.
      </h2>
      <section className="grid grid-cols-1  gap-4">
        <span
          style={addon?.includes("online") ? activeAddonStyle : {}}
          onClick={() => {
            if (!addon?.includes("online")) setAddon([...addon!, "online"]);
            else
              setAddon(
                addon.filter((add) => {
                  return add !== "online";
                })
              );
          }}
          className="flex  justify-between items-center  p-4 pr-5  hover:cursor-pointer border rounded-md"
        >
          <div className="flex gap-2">
            <input
              type={"checkbox"}
              checked={addon?.includes("online")}
              className="w-[1.5rem]"
            ></input>
            <span className=" font-bold ">
              <h1>Online service</h1>
              <h2 className="text-slate-400">Access to multiplayer games</h2>
            </span>
          </div>
          {period === "monthly" ? <h2>+$1/mo</h2> : <h2>+$10/yr</h2>}
        </span>
        <span
          style={addon?.includes("storage") ? activeAddonStyle : {}}
          onClick={() => {
            if (!addon?.includes("storage")) setAddon([...addon!, "storage"]);
            else
              setAddon(
                addon.filter((add) => {
                  return add !== "storage";
                })
              );
          }}
          className="flex  justify-between items-center p-4 pr-5 hover:cursor-pointer border rounded-md"
        >
          <div className="flex gap-2">
            <input
              type={"checkbox"}
              checked={addon?.includes("storage")}
              className="w-[1.5rem]"
            ></input>
            <span className=" font-bold ">
              <h1>Larger storage</h1>
              <h2 className="text-slate-400">Extra 11B of cloud save</h2>
            </span>
          </div>
          {period === "monthly" ? <h2>+$2/mo</h2> : <h2>+$20/yr</h2>}
        </span>

        <span
          style={addon?.includes("profile") ? activeAddonStyle : {}}
          onClick={() => {
            if (!addon?.includes("profile")) setAddon([...addon!, "profile"]);
            else
              setAddon(
                addon.filter((add) => {
                  return add !== "profile";
                })
              );
          }}
          className="flex  justify-between items-center p-4 pr-5 hover:cursor-pointer border rounded-md"
        >
          <div className="flex gap-2">
            <input
              type={"checkbox"}
              checked={addon?.includes("profile")}
              className="w-[1.5rem]"
            ></input>
            <span className=" font-bold ">
              <h1>Customizable profile</h1>
              <h2 className="text-slate-400">Custom theme on your profile</h2>
            </span>
          </div>
          {period === "monthly" ? <h2>+$2/mo</h2> : <h2>+$20/yr</h2>}
        </span>
      </section>
    </div>
  );
};

export default Addon;
