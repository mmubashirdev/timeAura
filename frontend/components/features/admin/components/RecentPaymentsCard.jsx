import { CreditCard, CheckCircle, Clock } from "lucide-react";
import SectionCard from "./SectionCard";
import { recentPayments as mockPayments } from "../data/dashboardData";

export default function RecentPaymentsCard({ data }) {
  const payments = data && data.length > 0 ? data : mockPayments;

  return (
    <SectionCard title="Recent Payments" action="View All" actionHref="/admin/orders">
      <div className="divide-y divide-border">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cream-muted">
              <CreditCard
                className="h-5 w-5 text-maroon"
                strokeWidth={1.5}
              />
            </div>

            {/* Payment info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900">{payment.id}</p>
              <p className="text-[11px] text-ink-400">
                {payment.customer} · {payment.date}
              </p>
            </div>

            {/* Amount + Status */}
            <div className="text-right">
              <p className="text-sm font-semibold text-ink-900">
                {payment.amount}
              </p>
              <div className="mt-0.5 flex items-center justify-end gap-1">
                {payment.status === "Completed" ? (
                  <>
                    <CheckCircle className="h-3 w-3 text-status-completed" />
                    <span className="text-[11px] font-medium text-status-completed">
                      Completed
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 text-status-pending" />
                    <span className="text-[11px] font-medium text-status-pending">
                      Pending
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}