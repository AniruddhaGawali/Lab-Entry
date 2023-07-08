import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

function SuccessfullBox() {
  return (
    <div className="w-full bg-white  rounded-lg flex flex-col items-center justify-center">
      <BsCheckCircleFill className="text-9xl text-green-500" />
      <br />
      <br />
      <h2 className="text-2xl text-center p-5 ">
        Your request has been submitted successfully.
      </h2>
    </div>
  );
}

export default SuccessfullBox;
