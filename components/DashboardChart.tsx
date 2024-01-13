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
    allowance: 140,
    savings: 240,
    investments: 320,
  },
  {
    name: "Feb",
    allowance: 220,
    savings: 354,
    investments: 410,
  },
  {
    name: "Mar",
    allowance: 300,
    savings: 480,
    investments: 560,
  },
  {
    name: "Apr",
    allowance: 400,
    savings: 600,
    investments: 700,
  },
  {
    name: "May",
    allowance: 500,
    savings: 700,
    investments: 800,
  },
  {
    name: "Jun",
    allowance: 600,
    savings: 800,
    investments: 900,
  },
  {
    name: "Jul",
    allowance: 700,
    savings: 900,
    investments: 1000,
  },
  {
    name: "Aug",
    allowance: 800,
    savings: 1000,
    investments: 1100,
  },
  {
    name: "Sep",
    allowance: 900,
    savings: 1100,
    investments: 1200,
  },
  {
    name: "Oct",
    allowance: 1000,
    savings: 1200,
    investments: 1300,
  },
  {
    name: "Nov",
    allowance: 1100,
    savings: 1300,
    investments: 1400,
  },
  {
    name: "Dec",
    allowance: 1200,
    savings: 1400,
    investments: 1500,
  },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={budgetData}
        margin={{ right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={() => <div></div>} />
        <Legend />
        <Line type="monotone" dataKey="allowance" stroke="#8884d8" />
        <Line type="monotone" dataKey="savings" stroke="#82ca9d" />
        <Line type="monotone" dataKey="investments" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
