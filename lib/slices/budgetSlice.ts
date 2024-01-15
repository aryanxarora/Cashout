import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "@/types";

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
  reducers: {},
});

export const {} = budgetSlice.actions;
export default budgetSlice.reducer;
