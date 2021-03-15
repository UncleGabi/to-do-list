import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, value, label }) => {
  return (
    <div className="input-group">
      <input onChange={handleChange} value={value} />
      <label
        className={`
          ${value.length > 0 ? "shrinkLabel" : ""} 
        input-label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
