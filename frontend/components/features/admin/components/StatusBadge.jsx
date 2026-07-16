import { STATUS_COLORS } from "../data/dashboardData.js";

export default function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.Pending;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colors.bg} ${colors.text}`}
    >
      {status}
    </span>
  );
}