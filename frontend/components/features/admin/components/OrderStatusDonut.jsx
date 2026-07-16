"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { orderStatusData, STATUS_COLORS } from "../data/dashboardData";

export default function OrderStatusDonut() {
  const total = orderStatusData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl bg-cream-panel p-5 shadow-[0_2px_12px_rgba(43,33,29,0.06)]">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
        Order Status
      </h3>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* Donut */}
        <div className="relative h-[180px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-ink-900">
              {total.toLocaleString()}
            </span>
            <span className="text-xs text-ink-400">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {orderStatusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-ink-600">
                <span className="font-semibold text-ink-900">{item.name}</span>
                {" "}
                {item.value} ({item.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#"
        className="mt-4 block text-xs font-medium text-maroon hover:underline"
      >
        View Details →
      </a>
    </div>
  );
}