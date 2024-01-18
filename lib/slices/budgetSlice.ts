import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "@/types";
import { RootState } from "@/lib/store";

const initialState: BudgetState = {
  allocation: {
    allowance: 0,
    savings: 0,
    investments: 0,
  },
  expenses: {},
  logs: [],
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    initBudget: (state, action: PayloadAction<BudgetState>) => {
      state.allocation = action.payload.allocation;
      state.expenses = action.payload.expenses;
      state.logs = action.payload.logs;
    },
  },
});

export const selectCurrentMonthLogs = (state: RootState) => {
  const date = new Date();
  return state.budget.logs.filter((log) => {
    return (
      date.getMonth() === log.date.toDate().getMonth() &&
      date.getFullYear() === log.date.toDate().getFullYear()
    );
  });
};

export const { initBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
