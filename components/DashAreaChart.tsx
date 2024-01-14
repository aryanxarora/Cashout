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

const budgetData = [
  {
    name: "Jan",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "Feb",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "Mar",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "Apr",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "May",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "Jun",
    income: 1426.9,
    allowance: 65.96,
    savings: 224.01,
    investments: 448.01,
  },
  {
    name: "Jul",
    income: 1611.9,
    allowance: 110.4,
    savings: 353.53,
    investments: 707.06,
  },
  {
    name: "Aug",
    income: 4000.69,
    allowance: 584.49,
    savings: 768.61,
    investments: 1537.23,
  },
  {
    name: "Sep",
    income: 2254.05,
    allowance: 115.18,
    savings: 169.31,
    investments: 338.63,
  },
  {
    name: "Oct",
    income: 3141.0,
    allowance: 406.62,
    savings: 566.25,
    investments: 1132.51,
  },
  {
    name: "Nov",
    income: 4310.34,
    allowance: 631.22,
    savings: 772.04,
    investments: 1544.08,
  },
  {
    name: "Dec",
    income: 5000,
    allowance: 800,
    savings: 1500,
    investments: 1700,
  },
];

const DashAreaChart = () => {
  return (
    <ResponsiveContainer width="90%" height="100%" className="text-sm">
      <AreaChart data={budgetData}>
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
    </ResponsiveContainer>
  );
};

export default DashAreaChart;
