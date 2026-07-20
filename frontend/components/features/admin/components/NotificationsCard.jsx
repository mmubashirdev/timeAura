import {
  Package,
  CheckCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import SectionCard from "./SectionCard";
import { notifications } from "../data/dashboardData";

import { notifications as mockNotifications } from "../data/dashboardData";

const typeConfig = {
  order: { icon: Package, color: "text-maroon", bg: "bg-red-50" },
  payment: { icon: CheckCircle, color: "text-status-completed", bg: "bg-green-50" },
  warning: { icon: AlertTriangle, color: "text-status-pending", bg: "bg-amber-50" },
  user: { icon: UserPlus, color: "text-status-shipped", bg: "bg-blue-50" },
};

export default function NotificationsCard({ data }) {
  const list = data && data.length > 0 ? data : mockNotifications;

  return (
    <SectionCard title="Latest Notifications" action="View All" actionHref="/admin/notifications">
      <div className="divide-y divide-border">
        {list.map((notif, idx) => {
          const config = typeConfig[notif.type] || typeConfig.order;
          const Icon = config.icon;

          return (
            <div
              key={idx}
              className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}
              >
                <Icon className={`h-4 w-4 ${config.color}`} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-ink-900">
                  {notif.message}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-400">{notif.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}