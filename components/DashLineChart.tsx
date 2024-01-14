"use client";

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

const DashboardChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="font-sans text-sm"
    >
      <LineChart data={budgetData} margin={{ right: 30 }}>
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
        <Line type="monotone" dataKey="savings" stroke="#82ca9d" dot={false} />
        <Line
          type="monotone"
          dataKey="investments"
          stroke="#ffc658"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
