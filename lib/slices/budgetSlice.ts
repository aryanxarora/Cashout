import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BudgetState } from "@/types";
import { RootState } from "@/lib/store";
import { Timestamp } from "firebase/firestore";

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
    },
  ],
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
});

export default budgetSlice.reducer;
