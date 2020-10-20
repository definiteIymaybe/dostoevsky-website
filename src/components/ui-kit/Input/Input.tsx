import React from "react";
import classes from "./Input.module.css";
import cn from "clsx";

interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  placeholder = "",
  onChange,
}: InputProps) => {
  return (
    <input
      className={cn(classes.input)}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
