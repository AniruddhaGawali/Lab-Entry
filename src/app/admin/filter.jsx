import React from "react";
import PropTypes from "prop-types";

import CheckBoxInput from "../../components/checkboxinput";
import InputBox from "../../components/input";

const ACTION = {
  UID: "uid",
  FULLNAME: "fullname",
  LABNO: "labno",
  PCNO: "pcno",
  PERSONALLAPTOP: "personalLaptop",
  SUBJECT: "subject",
  SEMESTER: "semester",
  DATE: "date",
  SECTION: "section",
};

export default function Filter({ isFilter, filter, dispatch }) {
  return (
    <div
      className={`overflow-scroll ${
        isFilter ? "w-full md:w-1/3 p-5" : "w-0 p-0"
      } transition-all duration-700 `}
    >
      <h1 className="font-bold  text-3xl  mx-14 text-tertiary">Filter</h1>
      <br />
      <div className="">
        <InputBox
          label="Date"
          type="date"
          placeholder="After Date"
          value={filter.date}
          setValue={dispatch}
          actionType={ACTION.DATE}
        />
        <br />
        <InputBox
          label="UID"
          type="number"
          placeholder="Enter UID"
          value={filter.uid}
          setValue={dispatch}
          actionType={ACTION.UID}
        />
        <br />
        <InputBox
          label="Full Name"
          type="text"
          placeholder="Enter Name"
          value={filter.fullname}
          setValue={dispatch}
          actionType={ACTION.FULLNAME}
        />
        <br />
        <InputBox
          label="lab no."
          type="text"
          placeholder="Enter Lab No."
          value={filter.labno}
          setValue={dispatch}
          actionType={ACTION.LABNO}
        />
        <br />
        <InputBox
          label="pc no."
          type="number"
          placeholder="Enter PC No."
          value={filter.pcno}
          setValue={dispatch}
          actionType={ACTION.PCNO}
        />
        <br />
        <InputBox
          label="Subject"
          type="text"
          placeholder="Enter Subject"
          value={filter.subject}
          setValue={dispatch}
          actionType={ACTION.SUBJECT}
        />
        <br />
        <CheckBoxInput
          label="Personal Laptop"
          value={filter.personalLaptop}
          setValue={dispatch}
          actionType={ACTION.PERSONALLAPTOP}
        />
        <br />
        <InputBox
          label="Semester"
          type="text"
          placeholder="Enter Semester"
          value={filter.semester}
          setValue={dispatch}
          actionType={ACTION.SEMESTER}
        />
        <br />
        <InputBox
          label="Section"
          type="text"
          placeholder="Enter Section"
          value={filter.section}
          setValue={dispatch}
          actionType={ACTION.SECTION}
        />
        <br />
      </div>
    </div>
  );
}

Filter.propTypes = {
  isFilter: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
