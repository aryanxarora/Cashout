import { useEffect, useState } from "react";
import { BudgetState, Income, expenses } from "@/types";
import { Timestamp } from "firebase/firestore";
import { getCookie } from "cookies-next";
import {
  addExpenseConfig,
  getUserData,
  newIncomeLog,
} from "@/app/firebase/functions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addExpense, addIncome } from "@/lib/slices/budgetSlice";

const Logger = () => {
  const data: BudgetState = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();
  const [income, setIncome] = useState({
    source: "",
    amount: 0,
    valid: 0, // 0 = netural, 1 = success, 2 = error
  });

  const [expense, setExpense] = useState({
    source: "",
    amount: 0,
    valid: 0,
  });

  const handleIncomeSubmit = () => {
    if (income.source === "" || income.amount === 0) {
      setIncome({ ...income, valid: 2 });
    } else {
      const log: Income = {
        source: income.source,
        amount: parseInt(income.amount.toString()),
        date: Timestamp.now(),
      };
      const uid = getCookie("uid");
      newIncomeLog(uid || "", log)
        .then(() => {
          setIncome({
            ...income,
            valid: 1,
          });
          dispatch(addIncome(log));
        })
        .catch((err) => {
          console.log(err);
        });
      // Add dispatch here
    }
  };

  const handleExpenseSubmit = () => {
    if (expense.source === "" || expense.amount === 0) {
      setExpense({ ...expense, valid: 2 });
    } else {
      const config: expenses = {
        name: expense.source,
        amount: parseInt(expense.amount.toString()),
      };
      const uid = getCookie("uid");
      addExpenseConfig(uid || "", config)
        .then(() => {
          setExpense({
            ...expense,
            valid: 1,
          });
          data?.config.expenses.push(config);
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(addExpense(config));
    }
  };

  // useEffect(() => {
  //   const uid = getCookie("uid");
  //   getUserData(uid || "").then((data) => {
  //     setData(data as BudgetState);
  //   });
  // }, []);

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">Monthly Income</h1>
        <h1 className="text-2xl text-white">Log Cash In</h1>
        {/* INCOME LOGGER */}
        <div>
          <h1 className="text-white mt-10 mb-5 text-lg font-semibold">
            Montly Income
          </h1>
          <div
            className={`flex justify-center items-center ${
              income.valid === 2
                ? "ring-2 ring-red-500 rounded-lg"
                : income.valid === 1
                ? "ring-2 ring-lime-500 rounded-lg"
                : ""
            }`}
          >
            <input
              type="text"
              className="bg-slate-800 py-5 w-3/6 px-4 text-white ring-0 focus:ring-0 focus:outline-none"
              placeholder="Source"
              style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
              name="source"
              autoComplete="off"
              onChange={(e) => {
                setIncome({
                  ...income,
                  [e.target.name]: e.target.value,
                  valid: 0,
                });
              }}
            />
            <input
              type="number"
              className="bg-slate-800 ring-0 focus:ring-0 focus:outline-none rounded-none py-5 w-2/6 px-4 text-white flex"
              placeholder="2000"
              min={0}
              name="amount"
              autoComplete="off"
              onChange={(e) => {
                setIncome({
                  ...income,
                  [e.target.name]: e.target.value,
                  valid: 0,
                });
              }}
            />
            <button
              className="bg-slate-900 py-5 w-1/6 flex justify-center rounded-r-lg"
              onClick={handleIncomeSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 stroke-lime-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* EXPENSE LOGGER */}
        <div>
          <h1 className="text-white mt-10 mb-5 text-lg font-semibold">
            Fixed Expenses
          </h1>
          <div
            className={`flex justify-center items-center ${
              expense.valid === 2
                ? "ring-2 ring-red-500 rounded-lg"
                : expense.valid === 1
                ? "ring-2 ring-lime-500 rounded-lg"
                : ""
            }`}
          >
            <input
              type="text"
              className="bg-slate-800 py-5 w-3/6 px-4 text-white ring-0 focus:ring-0 focus:outline-none"
              placeholder="Expense"
              style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
              name="source"
              autoComplete="off"
              onChange={(e) => {
                setExpense({
                  ...expense,
                  [e.target.name]: e.target.value,
                  valid: 0,
                });
              }}
            />
            <input
              type="number"
              className="bg-slate-800 ring-0 focus:ring-0 focus:outline-none rounded-none py-5 w-2/6 px-4 text-white flex"
              placeholder="1400"
              min={0}
              name="amount"
              autoComplete="off"
              onChange={(e) => {
                setExpense({
                  ...expense,
                  [e.target.name]: e.target.value,
                  valid: 0,
                });
              }}
            />
            <button
              className="bg-slate-900 py-5 w-1/6 flex justify-center rounded-r-lg"
              onClick={handleExpenseSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* EXPENSE LIST */}
        <div>
          {data && data.config.expenses.length > 0 ? (
            <div className="mt-10">
              {data.config.expenses.map((item, index) => (
                <div
                  key={index}
                  className="text-white flex w-full bg-slate-900 justify-between p-5 rounded-xl mt-3 items-center"
                >
                  <h1 className="text-white">{item.name}</h1>
                  <h1 className="text-red-500">${item.amount.toFixed(2)}</h1>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Logger;
