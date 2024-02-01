import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Allocation, BudgetState, expenses, Income } from "@/types";
import { RootState } from "@/lib/store";
import { Timestamp } from "firebase/firestore";
import { act } from "react-dom/test-utils";

const initialState: BudgetState = {
  config: {
    expenses: [],
    allocation: {
      allowance: 30,
      savings: 30,
      investments: 40,
    },
  },
  income: [],
  history: [
    {
      date: Timestamp.now(),
      income: [
        {
          source: "default",
          amount: 0,
          date: Timestamp.now(),
        },
      ],
      allowance: 0,
      savings: 0,
      investments: 0,
      total: 0,
    },
  ],
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action: PayloadAction<BudgetState>) => {
      Object.assign(state, action.payload);
    },
    addIncome: (state, action: PayloadAction<Income>) => {
      state.income.push(action.payload);
    },
    addExpense: (state, action: PayloadAction<expenses>) => {
      state.config.expenses.push(action.payload);
    },
    setAllocation: (state, action: PayloadAction<Allocation>) => {
      state.config.allocation = action.payload;
    }
  },
});

export const { setBudget, addIncome, addExpense, setAllocation } = budgetSlice.actions;
export default budgetSlice.reducer;
