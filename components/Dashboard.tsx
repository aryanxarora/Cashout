"use client";
import { getCookie } from "cookies-next";
import { DashLineChart } from "@/components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { getUserData, addNewUser } from "@/app/firebase/functions";
import { initBudget } from "@/lib/slices/budgetSlice";
import { BudgetState } from "@/types/index";
import { Timestamp } from "firebase/firestore";
import { selectCurrentMonthLogs } from "@/lib/slices/budgetSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const monthlyLog = useAppSelector(selectCurrentMonthLogs);
  const [income, setIncome] = useState<number>(0);

  useEffect(() => {
    if (monthlyLog.length > 0) {
      setIncome(monthlyLog[0].income);
    }
  }, monthlyLog);

  useEffect(() => {
    const uid = getCookie("uid");
    const dataHandler = async () => {
      const data = await getUserData(uid || "");
      if (data !== null) {
        dispatch(initBudget(data as BudgetState));
        return !null;
      } else {
        return null;
      }
    };

    dataHandler().then((data) => {
      if (data === null) {
        addNewUser(uid || "").then(() => {
          getUserData(uid || "").then((data) => {
            dispatch(initBudget(data as BudgetState));
          });
        });
      }
    });
  }, []);

  return (
    <div id="container" className="p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={getCookie("photo") || ""}
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full ring-lime-500 ring-2"
          />
          <div>
            <h1 className="text-sm text-slate-500">Cashout</h1>
            <h1 className="text-white">{getCookie("name")}</h1>
          </div>
        </div>
        <button onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-white stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <h1 className="mt-8 text-xl text-white">Income Earned</h1>
      <h1 className="font-bold text-3xl text-slate-300">${income}</h1>
      <h1 className="text-white mt-5">Overview</h1>
      <div className="w-full bg-slate-900 rounded-xl min-h-72 h-96 p-5 pl-0">
        <DashLineChart />
        {/* <DashAreaChart /> */}
      </div>
    </div>
  );
}
