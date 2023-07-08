"use client";

import React, { useReducer, useState } from "react";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";

import InputBox from "../components/input";
import CheckBoxInput from "../components/checkboxinput";
import SuccessfullBox from "../components/successfull";
// eslint-disable-next-line import/no-unresolved, import/extensions
import Loading from "@/components/loading";

const ACTION = {
  UID: "uid",
  FULLNAME: "fullname",
  LABNO: "labno",
  PCNO: "pcno",
  PERSONALLAPTOP: "personalLaptop",
  SUBJECT: "subject",
  SEMESTER: "semester",
  SECTION: "section",
};

export default function Home() {
  const initialform = {
    uid: "",
    fullname: "",
    labno: "",
    pcno: "",
    personalLaptop: false,
    subject: "",
    semester: "",
    section: "",
  };

  const reducer = (form, action) => {
    switch (action.type) {
      case ACTION.UID:
        return { ...form, uid: action.payload };
      case ACTION.FULLNAME:
        return { ...form, fullname: action.payload };
      case ACTION.LABNO:
        return { ...form, labno: action.payload };
      case ACTION.PCNO:
        return { ...form, pcno: action.payload };
      case ACTION.PERSONALLAPTOP:
        return { ...form, personalLaptop: action.payload, pcno: "" };
      case ACTION.SUBJECT:
        return { ...form, subject: action.payload };
      case ACTION.SEMESTER:
        return { ...form, semester: action.payload };
      case ACTION.SECTION:
        return { ...form, section: action.payload.split("").splice(-1).toString().toUpperCase() };
      default:
        return form;
    }
  };

  const [formState, dispatch] = useReducer(reducer, initialform);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="bg-primary w-screen h-screen flex items-center justify-center">
      {
      isLoading && <Loading />
    }
      <Link href="/admin">
        <button
          className="
        flex items-center
        absolute
        top-10
        right-10
        text-base
        w-fit p-3 bg-tertiary text-white rounded-md  cursor-pointer shadow-lg active:shadow-sm"
          type="button"
        >
          <MdAdminPanelSettings className="text-xl mr-2" />
          <span>Admin</span>
        </button>
      </Link>
      <div className={` xl:w-[65%] h-[70%] lg:w-[75%] w-[85%] rounded-lg flex transition-all duration-700`}>
        { success
          ? (<SuccessfullBox />)
          : (
            <>
              <form
                className="w-[100%] md:w-[50%] h-full flex flex-col justify-between rounded-lg md:rounded-r-none bg-secondary p-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!formState.uid
                    || !formState.fullname
                    || !formState.labno
                    || (
                      !formState.pcno
                      && !formState.personalLaptop
                    )
                    || !formState.subject
                    || !formState.semester
                    || !formState.section) {
                    // eslint-disable-next-line no-alert
                    alert("Please fill all the fields");
                    return;
                  }
                  setIsLoading(true);
                  const response = await fetch("https://ipapi.co/json/");
                  const ipData = await response.json();
                  const { ip } = ipData;
                  formState.ip = ip;

                  await fetch("https://freaky-api.vercel.app/LabEntry/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formState),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message === "success") {
                        setSuccess(true);
                      }
                    });
                  setIsLoading(false);
                }}
              >
                <InputBox
                  placeholder="UID"
                  type="number"
                  value={formState.uid}
                  setValue={dispatch}
                  actionType={ACTION.UID}
                />
                <InputBox
                  placeholder="Full Name"
                  type="text"
                  value={formState.fullname}
                  setValue={dispatch}
                  actionType={ACTION.FULLNAME}
                />
                <InputBox
                  placeholder="Lab no."
                  type="text"
                  value={formState.labno}
                  setValue={dispatch}
                  actionType={ACTION.LABNO}
                />
                <div>
                  <InputBox
                    placeholder="Pc no."
                    type="number"
                    value={formState.pcno}
                    setValue={dispatch}
                    actionType={ACTION.PCNO}
                    isDisabled={formState.personalLaptop}
                  />
                  <CheckBoxInput
                    label="Personal Laptop"
                    value={formState.personalLaptop}
                    setValue={dispatch}
                    actionType={ACTION.PERSONALLAPTOP}
                  />
                </div>
                <InputBox
                  placeholder="Subject"
                  type="text"
                  value={formState.subject}
                  setValue={dispatch}
                  actionType={ACTION.SUBJECT}
                />

                <div className="flex">
                  <InputBox
                    placeholder="Semester"
                    type="number"
                    value={formState.semester}
                    setValue={dispatch}
                    actionType={ACTION.SEMESTER}
                  />
                  <span className="m-3" />
                  <InputBox
                    placeholder="Section"
                    type="text"
                    value={formState.section}
                    setValue={dispatch}
                    actionType={ACTION.SECTION}
                  />
                </div>

                <input
                  type="submit"
                  value="Register"
                  className="text-base p-3 bg-tertiary text-white rounded-md w-full cursor-pointer shadow-lg active:shadow-sm"
                />
              </form>
              <section className="w-[50%]  h-full bg-white hidden md:flex flex-col items-start justify-center  rounded-r-lg">
                <h2 className="font-bold text-5xl mx-14">Student</h2>
                <img src="/studentlogin.jpg" alt="" />
              </section>
            </>
          )}
      </div>
    </main>
  );
}
