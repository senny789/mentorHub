import React from "react";
import { form } from "..";

const FormProgress = ({ currentForm }: { currentForm: form }) => {
  const activeFormStyle = {
    backgroundColor: "hsl(228,83%,86%)",
    color: "black",
    border: "none",
  };
  return (
    <>
      <div className="z-1 flex gap-4">
        <span
          style={currentForm === "personal" ? activeFormStyle : {}}
          className="font-bold aspect-square h-[2.5rem] w-[2.5rem]  border border-white text-white rounded-full flex text-xl justify-center items-center"
        >
          1
        </span>
        <span>
          <h2 className="text-white font-thin ">Step 1</h2>
          <h1 className="text-white font-bold text-xl">Your Info</h1>
        </span>
      </div>
      <div className="z-1 flex gap-4">
        <span
          style={currentForm === "plan" ? activeFormStyle : {}}
          className="font-bold aspect-square h-[2.5rem] w-[2.5rem] border border-white text-white rounded-full flex text-xl justify-center items-center"
        >
          2
        </span>
        <span>
          <h2 className="text-white font-thin ">Step 2</h2>
          <h1 className="text-white font-bold text-xl">Select Plan</h1>
        </span>
      </div>
      <div className="z-1 flex gap-4">
        <span
          style={currentForm === "addon" ? activeFormStyle : {}}
          className="font-bold aspect-square h-[2.5rem] w-[2.5rem] border border-white text-white rounded-full flex text-xl justify-center items-center"
        >
          3
        </span>
        <span>
          <h2 className="text-white font-thin ">Step 3</h2>
          <h1 className="text-white font-bold text-xl">Add-ONs</h1>
        </span>
      </div>
      <div className="z-1 flex gap-4">
        <span
          style={currentForm === "summary" ? activeFormStyle : {}}
          className="font-bold aspect-square h-[2.5rem] w-[2.5rem] border border-white text-white rounded-full flex text-xl justify-center items-center"
        >
          4
        </span>
        <span>
          <h2 className="text-white font-thin ">Step 4</h2>
          <h1 className="text-white font-bold text-xl">Summary</h1>
        </span>
      </div>
    </>
  );
};

export default FormProgress;
