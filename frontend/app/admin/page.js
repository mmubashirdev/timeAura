"use client";
import StatsGrid from "@/components/features/admin/components/StatsGrid";
import OrdersOverviewChart from "@/components/features/admin/components/OrdersOverviewChart";
import OrderStatusDonut from "@/components/features/admin/components/OrderStatusDonut";
import RecentOrdersCard from "@/components/features/admin/components/RecentOrdersCard";
import RecentPaymentsCard from "@/components/features/admin/components/RecentPaymentsCard";
import TopProductsCard from "@/components/features/admin/components/TopProductsCard";
import NotificationsCard from "@/components/features/admin/components/NotificationsCard";
import ActiveUsersCard from "@/components/features/admin/components/ActiveUsersCard";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Stat Cards */}
      <StatsGrid />

      {/* Orders Overview + Order Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <OrdersOverviewChart />
        <OrderStatusDonut />
      </div>

      {/* Recent Orders + Payments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrdersCard />
        <RecentPaymentsCard />
      </div>

      {/* Top Products + Notifications + Active Users */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TopProductsCard />
        <NotificationsCard />
        <ActiveUsersCard />
      </div>
    </div>
  );
}