"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loading } from "@/components";
import { BudgetState, History, Income } from "@/types";
import { Timestamp } from "firebase/firestore";
import { type } from "os";

const DashboardChart = ({ data }: { data: BudgetState }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<History[]>([]);

  useEffect(() => {
    const updatedHistory = data.history.map((item) => ({
      ...item, // spread the existing properties
      total: item.income.reduce((acc, curr) => acc + curr.amount, 0), // calculate the new total
    }));

    const currentData = {
      date: Timestamp.now(),
      income: data.income,
      allowance: 100,
      savings: 200,
      investments: 300,
      total: data.income.reduce((acc, curr) => acc + curr.amount, 0),
    };

    setChartData([...updatedHistory, currentData]);
  }, [data.history, data.income]); // Make sure to include all dependencies in this array

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="font-sans text-sm"
    >
      {loading ? (
        <Loading styles="h-full pl-5" />
      ) : (
        <LineChart data={chartData} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />

          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload.find((p) => p.dataKey === "total");

                return (
                  <div className="bg-slate-800 rounded-xl p-2 text-slate-500">
                    {data ? `Total: $${data.value}` : "No data"}
                    <br />
                    {payload[0].payload.date
                      .toDate()
                      .toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                  </div>
                );
              }

              return null;
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" dot={false} />
          <Line
            type="monotone"
            dataKey="allowance"
            stroke="#FF6961"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#82ca9d"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="investments"
            stroke="#ffc658"
            dot={false}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default DashboardChart;
