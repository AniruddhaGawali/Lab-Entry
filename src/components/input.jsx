import React from "react";
import PropTypes from "prop-types";

function InputBox({
  placeholder, type, value, setValue, actionType, isDisabled,
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div className="w-full my-2 relative">
      <label
        htmlFor={placeholder}
        className={`text-base font-bold ${!isDisabled ? "bg-white" : ""} rounded-md px-3 absolute ${isFocused || value.length > 0 ? "-top-4 left-3" : "top-[20%] left-3"} ${isFocused && "ring-2 ring-tertiary"}  transition-all duration-300`}
      >
        {placeholder}
      </label>

      <input
        type={type || "text"}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          // eslint-disable-next-line no-unused-expressions
          actionType !== undefined
            ? setValue({
              type: actionType,
              payload: e.target.value,
            }) : setValue(e.target.value);
        }}
        id={placeholder}
        className="text-base p-2 rounded-md w-full ring-2 ring-primary  focus:ring-2 focus:ring-tertiary focus:outline-none placeholder-black placeholder:text-base placeholder:font-bold disabled:cursor-not-allowed  transition-all duration-300"
        disabled={isDisabled || false}
      />
    </div>
  );
}

export default InputBox;

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  actionType: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
