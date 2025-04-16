import { FC } from "react";
import { ButtonProps } from "./types";

import "./styles/index.scss";

const Button: FC<ButtonProps> = ({
  type = "primary",
  label,
  onClick,
  isLoading = false,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={`button button-${type} ${
        isLoading ? "loading" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
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
    </button>
  );
};

export default Button;
