import React, { useState } from "react";

import InputBox from "../../components/input";

// eslint-disable-next-line react/prop-types
export default function TeacherLogin({ setIsLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
      <div className="w-1/3 flex flex-col justify-center items-center py-5 bg-secondary rounded-lg shadow-lg">
        <h1 className="font-bold text-5xl mx-14 text-white">Teacher Login</h1>
        <br />
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (id === "admin" && password === "admin") {
              setIsLogin(true);
            } else {
              alert("User or Password is incorrect");
            }
          }}
          className="w-[100%] md:w-[80%] h-full flex flex-col justify-between rounded-lg p-5"
        >
          <InputBox type="text" placeholder="User" value={id} setValue={setId} />
          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <br />
          <br />
          <input
            type="submit"
            value="Login"
            className="text-base p-3 bg-tertiary text-white rounded-md w-full cursor-pointer shadow-lg active:shadow-sm"
          />
        </form>
      </div>
  );
}
