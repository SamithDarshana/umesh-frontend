import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    className,
    classdiv,
    value,
    onchange,
    onblur,
    disabled,
  } = props;
  return (
    <>
      <div className={`${classdiv}`}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`form-control ${className}`}
          value={value}
          onChange={onchange}
          onBlur={onblur}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default CustomInput;
