import { useAppSelector } from "@/lib/hooks";
import { BudgetState } from "@/types";

export default function Budget() {
  const data: BudgetState = useAppSelector((state) => state.budget);
  const totalExpenses = data.config.expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalIncome = data.income.reduce((acc, curr) => acc + curr.amount, 0);

  const allocation = [
    {
      name: "Allowance",
      amount:
        (totalIncome - totalExpenses) *
        (data.config.allocation.allowance / 100),
      share: data.config.allocation.allowance,
    },
    {
      name: "Savings",
      amount:
        (totalIncome - totalExpenses) * (data.config.allocation.savings / 100),
      share: data.config.allocation.savings,
    },
    {
      name: "Investments",
      amount:
        (totalIncome - totalExpenses) *
        (data.config.allocation.investments / 100),
      share: data.config.allocation.investments,
    },
  ];

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">Monthly Allocation</h1>
        <h1 className="text-2xl text-white">Summary</h1>
        <div className="text-white mt-10">
          {/* Income */}
          <>
            <h1 className="text-white mt-10 mb-3 text-lg font-semibold">
              Income Earned
            </h1>
            <div className="border border-slate-600 bg-slate-900 p-5 rounded-lg">
              {data.income
                .slice()
                .sort(
                  (a, b) =>
                    b.date.toDate().getTime() - a.date.toDate().getTime()
                )
                .map((income, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="flex items-end gap-2">
                      <h1>{income.source}</h1>
                      <h1 className="text-sm text-slate-500">
                        {income.date.toDate().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h1>
                    </div>
                    <h1 className="text-lime-500">
                      ${income.amount.toFixed(2)}
                    </h1>
                  </div>
                ))}
              <hr className="opacity-25 my-2" />
              <div className="flex justify-between">
                <h1>Total</h1>
                <h1 className="text-lime-500 font-bold">
                  $
                  {data.income
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </h1>
              </div>
            </div>
          </>

          {/* Expense */}
          <>
            <h1 className="text-white mt-10 mb-3 text-lg font-semibold">
              Expenses
            </h1>
            <div className="border border-slate-600 bg-slate-900 p-5 rounded-lg">
              {data.config.expenses.map((expense, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex items-end gap-2">
                    <h1>{expense.name}</h1>
                  </div>
                  <h1 className="text-red-500">${expense.amount.toFixed(2)}</h1>
                </div>
              ))}
              <hr className="opacity-25 my-2" />
              <div className="flex justify-between">
                <h1>Total</h1>
                <h1 className="text-red-500 font-bold">
                  $
                  {data.config.expenses
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toFixed(2)}
                </h1>
              </div>
            </div>
          </>

          {totalIncome - totalExpenses < 0 ? (
            <div className="border border-slate-600 bg-slate-900 mt-10 p-5 rounded-lg py-10">
              <h1>
                Keep going!{" "}
                <span className="text-lime-500">
                  ${(totalExpenses - totalIncome).toFixed(2)}
                </span>{" "}
                left to cover your expenses!
              </h1>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mt-10 text-slate-500 pr-5">
                <h1>Remainder</h1>
                <p>${(totalIncome - totalExpenses).toFixed(2)}</p>
              </div>

              {/* Allocation */}
              <>
                <h1 className="text-white mt-10 mb-3 text-lg font-semibold">
                  Allocation
                </h1>
                <div className="border border-slate-600 bg-slate-900 p-5 rounded-lg">
                  {allocation.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-end gap-2">
                        <h1>{item.name}</h1>
                        <h1 className="text-sm text-slate-500">
                          {item.share}%
                        </h1>
                      </div>
                      <h1 className="text-blue-500">
                        ${item.amount.toFixed(2)}
                      </h1>
                    </div>
                  ))}
                </div>
              </>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
