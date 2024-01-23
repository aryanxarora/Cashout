import { Button } from "@/components";
import { useState } from "react";
import { Income } from "@/types";
import { Timestamp } from "firebase/firestore";
import { getCookie } from "cookies-next";
import { newIncomeLog } from "@/app/firebase/functions";

const Logger = () => {
  console.log("Logger Called");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState(0);

  const handleLog = () => {
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
  };

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">Monthly Income</h1>
        <h1 className="text-2xl text-white">Log Cash In</h1>

        {status == 0 ? (
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
          placeholder="YouTube Sponsorship – Notion"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <Button title="Submit" styles="mt-20" handleClick={handleLog} />
      </div>
    </main>
  );
};

export default Logger;
