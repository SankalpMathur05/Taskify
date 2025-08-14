import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-box">
      {label && <label className="input-label">{label}</label>}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
        {type === "password" && (
          <span
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#555",
              fontSize: "1.5rem",
            }}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
