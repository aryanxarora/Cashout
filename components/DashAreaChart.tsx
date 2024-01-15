"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAppSelector } from "@/lib/hooks";
import { Loading } from "@/components";
import { useState } from "react";

const DashAreaChart = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ResponsiveContainer width="100%" height="100%" className="text-sm">
      {loading ? (
        <Loading styles="h-full pl-5" />
      ) : (
        <AreaChart data={[]}>
          <YAxis dataKey="" />
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip content={() => <div></div>} />
          <Area
            dataKey="income"
            type="monotone"
            stroke="#A6E02D"
            fill="#B8F535"
          />
          <Area
            dataKey="investments"
            type="monotone"
            stroke="#90D81D"
            fill="#A1E623"
          />
          <Area
            dataKey="savings"
            type="monotone"
            stroke="#79C507"
            fill="#8AD70D"
          />
          <Area
            dataKey="allowance"
            type="monotone"
            stroke="#62B100"
            fill="#73C300"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default DashAreaChart;
