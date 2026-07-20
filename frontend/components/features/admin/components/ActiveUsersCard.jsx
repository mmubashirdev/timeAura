"use client";
import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import SectionCard from "./SectionCard";
import { activeUsersChartData as mockChartData } from "../data/dashboardData";

export default function ActiveUsersCard({ data, activeUsersCount }) {
  const chartData = data && data.length > 0 ? data : mockChartData;
  const countVal = activeUsersCount !== undefined ? activeUsersCount : 2350;

  return (
    <SectionCard title="Active Users" action="View All" actionHref="/admin/users">
      {/* Stats */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-ink-900">{countVal.toLocaleString()}</p>
        <p className="text-xs text-ink-400">Active Users</p>
        <div className="mt-1 flex items-center gap-1 text-[11px]">
          <TrendingUp className="h-3 w-3 text-status-delivered" />
          <span className="font-medium text-status-delivered">
            ↑ 15.2%
          </span>
          <span className="text-ink-400">from last week</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 0, left: -25, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              tick={{ fill: "#A79E95", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#A79E95", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #EAE1D6",
                borderRadius: "8px",
                fontSize: "11px",
              }}
            />
            <Bar
              dataKey="users"
              fill="#7A1F2E"
              radius={[4, 4, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}