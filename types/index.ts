import { MouseEventHandler } from "react";

export interface ButtonProps {
  title: string;
  styles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface Allocation {
  allowance: number;
  savings: number;
  investments: number;
}

export interface Expenses {}

export interface Month {
  name: string;
  income: number;
  allowance: number;
  savings: number;
  investments: number;
}
