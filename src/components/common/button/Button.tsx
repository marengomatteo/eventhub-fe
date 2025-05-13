import { FC } from "react";
import { ButtonProps } from "./types";

import "./styles/index.scss";

const Button: FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  label,
  onClick,
  isLoading = false,
  disabled = false,
  icon,
  className,
}) => {
  return (
    <button
      className={`button button-${variant} ${isLoading ? "loading" : ""
        } ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <div className="spinner">
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>
      ) : (
        label
      )}
      {icon && <img src={icon} />}
    </button>
  );
};

export default Button;
