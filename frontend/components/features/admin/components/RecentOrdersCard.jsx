import SectionCard from "./SectionCard";
import StatusBadge from "./StatusBadge";
import { recentOrders } from "../data/dashboardData";

export default function RecentOrdersCard() {
  return (
    <SectionCard title="Recent Orders" action="View All" actionHref="#">
      <div className="divide-y divide-border">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            {/* Thumbnail */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-muted">
              <img
                src={order.img}
                alt={order.id}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=P&background=F3ECE3&color=7A1F2E&size=40";
                }}
              />
            </div>

            {/* Order info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900">{order.id}</p>
              <p className="text-[11px] text-ink-400">
                {order.customer} · {order.date}
              </p>
            </div>

            {/* Status */}
            <StatusBadge status={order.status} />

            {/* Amount */}
            <p className="text-sm font-semibold text-ink-900 whitespace-nowrap">
              {order.amount}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}