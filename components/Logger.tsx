import { Button } from "@/components";
import { useState } from "react";
import { Income } from "@/types";
import { Timestamp } from "firebase/firestore";
import { getCookie } from "cookies-next";
import { newIncomeLog } from "@/app/firebase/functions";

const Logger = () => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseInvalid, setExpenseInvalid] = useState<boolean>(false);
  const [expense, setExpense] = useState<string>("");

  const handleLog = () => {
    if (amount == "" || source == "") {
      setStatus(2);
    } else {
      const log: Income = {
        amount: parseInt(amount),
        source: source,
        date: Timestamp.now(),
      };
      const uid = getCookie("uid");
      newIncomeLog(uid || "", log)
        .then(() => {
          setStatus(1);
        })
        .catch(() => {
          setStatus(2);
        });
    }
  };

  const handleExpenseSave = () => {
    if (expense == "" || expenseAmount == 0) {
      setExpenseInvalid(true);
    } else {
    }
  };

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">Monthly Income</h1>
        <h1 className="text-2xl text-white">Log Cash In</h1>

        {/* {status == 0 ? (
          <h1></h1>
        ) : status == 1 ? (
          <h1 className="rounded-xl border-2 border-lime-500 mt-10 py-4 px-3 w-full text-lime-500">
            Income Log Successful!
          </h1>
        ) : (
          <h1 className="rounded-xl border-2 border-red-500 mt-10 py-4 px-3 w-full text-red-500">
            Error! Unable to log income.
          </h1>
        )}

        <h1 className="text-white mt-10 mb-4">Amount</h1>
        <div className="bg-slate-800 flex justify-center items-center py-5 px-5 rounded-xl text-lg text-white border-0">
          <h1 className="mr-5">$</h1>
          <input
            type="number"
            className="w-full bg-slate-800  text-white ring-0 focus:ring-0 focus:outline-none"
            placeholder="2000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <h1 className="text-white mt-10 mb-4">Source</h1>
        <input
          type="text"
          className="w-full text-white bg-slate-800 py-5 px-5 rounded-xl ring-0 focus:ring-0 focus:outline-none"
          placeholder="Brand Deal"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button
          className="bg-slate-800 text-white w-full rounded-xl py-3 mt-5"
          onClick={handleLog}
        >
          Log
        </button> */}
        <div>
          <h1 className="text-white mt-10 mb-5 text-lg font-semibold">
            Income
          </h1>
          <div
            className={`flex justify-center items-center rounded-xl ${
              expenseInvalid ? "ring-2 ring-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="bg-slate-800 py-5 rounded-l-xl w-3/6 px-4 text-white ring-0 focus:ring-0 focus:outline-none"
              placeholder="Brand Deal"
              onChange={(e) => {
                setExpense(e.target.value);
                setExpenseInvalid(false);
              }}
            />
            <input
              type="number"
              className="bg-slate-800 ring-0 focus:ring-0 focus:outline-none py-5 w-2/6 px-4 text-white flex"
              placeholder="2000"
              min={0}
              onChange={(e) => {
                setExpenseAmount(parseInt(e.target.value));
                setExpenseInvalid(false);
              }}
            />
            <button
              className="bg-slate-900 py-5 rounded-r-xl w-1/6 flex justify-center"
              onClick={handleLog}
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
        <div>
          <h1 className="text-white mt-10 mb-5 text-lg font-semibold">
            Expenses
          </h1>
          <div
            className={`flex justify-center items-center rounded-xl ${
              expenseInvalid ? "ring-2 ring-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="bg-slate-800 py-5 rounded-l-xl w-3/5 px-4 text-white ring-0 focus:ring-0 focus:outline-none"
              placeholder="Rent"
              onChange={(e) => {
                setExpense(e.target.value);
                setExpenseInvalid(false);
              }}
            />
            <input
              type="number"
              className="bg-slate-800 ring-0 focus:ring-0 focus:outline-none py-5 w-2/5 px-4 text-white flex"
              placeholder="1300"
              min={0}
              onChange={(e) => {
                setExpenseAmount(parseInt(e.target.value));
                setExpenseInvalid(false);
              }}
            />
            <button
              className="bg-slate-900 py-5 rounded-r-xl w-1/5 flex justify-center"
              onClick={handleExpenseSave}
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
      </div>
    </main>
  );
};

export default Logger;
