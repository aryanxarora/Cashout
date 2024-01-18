import { MouseEventHandler } from "react";
import { Timestamp } from "firebase/firestore";

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

export interface MonthlyLog {
  date: Timestamp;
  income: number;
  allowance: number;
  savings: number;
  investments: number;
}

export interface BudgetState {
  allocation: Allocation;
  expenses: Expenses;
  logs: MonthlyLog[];
}
