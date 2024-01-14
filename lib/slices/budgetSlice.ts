import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Allocation, Expenses, Month } from "@/types";

export interface BudgetState {
  allocation: Allocation;
  expenses: Expenses;
  year: Month[];
}

const initialState: BudgetState = {
  allocation: {
    allowance: 0,
    savings: 0,
    investments: 0,
  },
  expenses: {},
  year: [],
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setAllocation: (state, action: PayloadAction<Allocation>) => {
      state.allocation = action.payload;
    },
    setExpenses: (state, action: PayloadAction<Expenses>) => {
      state.expenses = action.payload;
    },
    setYear: (state, action: PayloadAction<Month[]>) => {
      state.year = action.payload;
    },
    setBudget: (state, action: PayloadAction<BudgetState>) => {
      state = action.payload;
    },
    setMonth: (state, action: PayloadAction<Month>) => {
      state.year.push(action.payload);
    },
  },
});
