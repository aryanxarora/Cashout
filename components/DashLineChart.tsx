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
import { useAppSelector } from "@/lib/hooks";

const DashboardChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const logs = useAppSelector((state) => state.budget.logs);
  useEffect(() => {
    if (logs.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    console.log("log check", logs);
  }, logs);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="font-sans text-sm"
    >
      {loading ? (
        <Loading styles="h-full pl-5" />
      ) : (
        <LineChart data={logs} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={() => <div></div>} />
          <Legend />
          <Line
            type="monotone"
            dataKey="allowance"
            stroke="#8884d8"
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
