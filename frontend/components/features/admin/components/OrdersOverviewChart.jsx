"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ordersChartData } from "../data/dashboardData";

export default function OrdersOverviewChart() {
  const [filter, setFilter] = useState("This Week");

  return (
    <div className="rounded-2xl bg-cream-panel p-5 shadow-[0_2px_12px_rgba(43,33,29,0.06)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
          Orders Overview
        </h3>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-xs font-medium text-maroon hover:underline sm:block"
          >
            View All Orders →
          </a>
        </div>
      </div>

      {/* Filter pill */}
      <div className="mb-4 flex justify-end">
        <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-ink-900 hover:bg-cream-muted">
          {filter}
          <ChevronDown className="h-3 w-3 text-ink-400" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={ordersChartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7A1F2E" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#7A1F2E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EAE1D6"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#A79E95", fontSize: 11 }}
              axisLine={{ stroke: "#EAE1D6" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#A79E95", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 500]}
              ticks={[0, 100, 200, 300, 400, 500]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #EAE1D6",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#7A1F2E"
              strokeWidth={2.5}
              fill="url(#colorOrders)"
              dot={{
                fill: "#7A1F2E",
                stroke: "#fff",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{ r: 6, stroke: "#7A1F2E", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}