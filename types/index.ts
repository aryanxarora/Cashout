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

export interface expenses {
  name: string;
  amount: number;
}

export interface Config {
  expenses: expenses[];
  allocation: Allocation;
}

export interface Income {
  source: string;
  amount: number;
  date: Timestamp;
}

export interface History {
  date: Timestamp;
  income: Income[];
  allowance: number;
  savings: number;
  investments: number;
  total: number;
}

export interface BudgetState {
  config: Config;
  income: Income[];
  history: History[];
}
