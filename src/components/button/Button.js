import React from "react";

//destruc những props cần dùng để  component cha truyền vào
const Button = ({
  onClick,
  children,
  className,
  full = false,
  bgColor = "primary",
  type = "button",
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";

      break;
    case "secondary":
      bgClassName = "bg-secondary";

      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 rounded-lg capitalize   mt-auto ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
