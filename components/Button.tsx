"use client";
import { ButtonProps } from "@/types";
import React from "react";

const Button = ({ title, styles, handleClick }: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={"button"}
      className={`btn-primary ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
