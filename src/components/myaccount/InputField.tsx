// src/components/InputField.tsx

import React from "react";

// Define the props interface
interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For select fields
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  options,
}) => {
  if (type === "select" && options) {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border rounded"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-2 border rounded"
      required={required}
    />
  );
};

export default InputField;
