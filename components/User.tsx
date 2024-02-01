"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAllocationConfig } from "@/app/firebase/functions";
import { Allocation, BudgetState } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAllocation } from "@/lib/slices/budgetSlice";

export default function User() {
  const router = useRouter();
  const data: BudgetState = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();

  const [invalid, setInvalid] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<number>(
    data.config.allocation.allowance
  );
  const [savings, setSavings] = useState<number>(
    data.config.allocation.savings
  );
  const [investments, setInvestments] = useState<number>(
    data.config.allocation.investments
  );

  const handleSignOut = () => {
    deleteCookie("uid");
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("photo");
    router.push("/login");
  };

  const handleAllocationSave = () => {
    if (allowance + savings + investments != 100) {
      console.log(allowance, savings, investments);
      setInvalid(true);
    } else {
      const config: Allocation = {
        allowance: allowance,
        savings: savings,
        investments: investments,
      };
      const uid = getCookie("uid");
      setAllocationConfig(uid || "", config).then(() => {
        setSave(true);
        dispatch(setAllocation(config));
      });
    }
  };

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">{getCookie("name")}</h1>
        <h1 className="text-2xl text-white">User Settings</h1>
        <div>
          <h1 className="text-white mt-10 mb-5 text-lg font-semibold">
            Allocation Distribution
          </h1>
          <div className="text-white flex w-full bg-slate-900 justify-between p-5 py-3 rounded-xl mt-5 items-center">
            <h1>Allowance</h1>
            <div className="flex items-center justify-center gap-3 ">
              <input
                type="number"
                min={0}
                max={100}
                className={`bg-slate-800 px-3 py-2 rounded-xl ring-0 focus:outline-none text-center ${
                  invalid ? "ring-2 ring-red-500" : ""
                }`}
                defaultValue={data?.config.allocation.allowance}
                onChange={(e) => {
                  setInvalid(false);
                  setSave(false);
                  setAllowance(parseInt(e.target.value));
                }}
              />
              <h1 className="text-slate-600">%</h1>
            </div>
          </div>
          <div className="text-white flex w-full bg-slate-900 justify-between p-5 py-3 rounded-xl mt-5 items-center">
            <h1>Savings</h1>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                min={0}
                max={100}
                className={`bg-slate-800 px-3 py-2 rounded-xl ring-0 focus:outline-none text-center ${
                  invalid ? "ring-2 ring-red-500" : ""
                }`}
                defaultValue={data?.config.allocation.savings}
                onChange={(e) => {
                  setInvalid(false);
                  setSave(false);
                  setSavings(parseInt(e.target.value));
                }}
              />
              <h1 className="text-slate-600">%</h1>
            </div>
          </div>
          <div className="text-white flex w-full bg-slate-900 justify-between p-5 py-3 rounded-xl mt-5 items-center">
            <h1>Investments</h1>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                min={0}
                max={100}
                className={`bg-slate-800 px-3 py-2 rounded-xl ring-0 focus:outline-none text-center ${
                  invalid ? "ring-2 ring-red-500" : ""
                }`}
                defaultValue={data?.config.allocation.investments}
                onChange={(e) => {
                  setInvalid(false);
                  setSave(false);
                  setInvestments(parseInt(e.target.value));
                }}
              />
              <h1 className="text-slate-600">%</h1>
            </div>
          </div>
          <button
            className={`bg-slate-800 text-white w-full rounded-xl py-3 mt-5 ${
              save ? "ring-2 ring-lime-500" : ""
            }`}
            onClick={handleAllocationSave}
          >
            {save ? "Saved!" : "Save"}
          </button>
        </div>
        <Button title="Sign Out" handleClick={handleSignOut} styles="mt-20" />
      </div>
    </main>
  );
}
