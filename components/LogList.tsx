import { Income } from "@/types";
import React from "react";

const LogList = ({ income }: { income: Income[] }) => {
  return (
    <div>
      {income
        .sort(
          (a: Income, b: Income) =>
            b.date.toDate().getTime() - a.date.toDate().getTime()
        )
        .map((item: Income, index: number) => (
          <div
            key={index}
            className="text-white flex w-full bg-slate-800 justify-between p-5 rounded-xl mt-2 items-center"
          >
            <div>
              <p className="text-sm text-slate-400">
                {(() => {
                  const itemDate = item.date.toDate();
                  const today = new Date();
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);

                  if (itemDate.toDateString() === today.toDateString()) {
                    return "Today";
                  } else if (
                    itemDate.toDateString() === yesterday.toDateString()
                  ) {
                    return "Yesterday";
                  } else {
                    return itemDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }
                })()}
              </p>
              <h1 className="font-semibold">{item.source}</h1>
            </div>
            <div>
              <p className="text-lime-500 font-bold">
                ${item.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LogList;
