"use client";
import { getCookie } from "cookies-next";
import { DashLineChart, LogList } from "@/components";
import { useEffect, useState } from "react";
import { getUserData, addNewUser } from "@/app/firebase/functions";
import { BudgetState } from "@/types";

export default function Dashboard() {
  const [data, setData] = useState<BudgetState>();
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const uid = getCookie("uid");
    const dataHandler = async () => {
      const data = await getUserData(uid || "");
      if (data !== null) {
        setData(data as BudgetState);
        setIncome(data.income);
        return !null;
      } else {
        return null;
      }
    };

    dataHandler().then((data) => {
      if (data === null) {
        addNewUser(uid || "").then(() => {
          getUserData(uid || "").then((data) => {
            setData(data as BudgetState);
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
            <h1 className="text-sm text-slate-500">Cash Compass</h1>
            <h1 className="text-white">{getCookie("name")}</h1>
          </div>
        </div>
      </div>
      <h1 className="mt-8 text-xl text-white">Income Earned</h1>
      <h1 className="font-bold text-3xl text-slate-300">
        $
        {data?.income
          .reduce((a, b) => a + b.amount, 0)
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
      </h1>
      <h1 className="text-white mt-7 mb-5 text-lg font-semibold">Overview</h1>
      <div className="w-full bg-slate-900 rounded-xl min-h-72 h-96 p-5 pl-0 pr-0">
        {data && <DashLineChart data={data} />}
      </div>
      <LogList income={income} />
    </div>
  );
}
