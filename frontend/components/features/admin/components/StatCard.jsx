import {
  Package,
  Wallet,
  Box,
  Users,
  TrendingUp,
} from "lucide-react";

const iconMap = {
  orders: Package,
  revenue: Wallet,
  products: Box,
  users: Users,
};

export default function StatCard({ label, value, deltaPct, deltaLabel, iconType }) {
  const Icon = iconMap[iconType] || Package;

  return (
    <div className="rounded-2xl bg-cream-panel p-5 shadow-[0_2px_12px_rgba(43,33,29,0.06)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-muted">
          <Icon className="h-5 w-5 text-maroon" strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-600">
            {label}
          </p>
          <p className="mt-1 text-xl font-bold text-ink-900 lg:text-2xl">
            {value}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-[11px]">
        <TrendingUp className="h-3 w-3 text-status-delivered" />
        <span className="font-medium text-status-delivered">↑ {deltaPct}%</span>
        <span className="text-ink-400">{deltaLabel}</span>
      </div>
    </div>
  );
}