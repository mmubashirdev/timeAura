"use client";
import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@/lib/api";
import StatsGrid from "@/components/features/admin/components/StatsGrid";
import OrdersOverviewChart from "@/components/features/admin/components/OrdersOverviewChart";
import OrderStatusDonut from "@/components/features/admin/components/OrderStatusDonut";
import RecentOrdersCard from "@/components/features/admin/components/RecentOrdersCard";
import RecentPaymentsCard from "@/components/features/admin/components/RecentPaymentsCard";
import TopProductsCard from "@/components/features/admin/components/TopProductsCard";
import NotificationsCard from "@/components/features/admin/components/NotificationsCard";
import ActiveUsersCard from "@/components/features/admin/components/ActiveUsersCard";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: ordersApi.getStats,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-ink-500">Loading dashboard statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Failed to load dashboard statistics</p>
        <p className="text-sm mt-1">{error.message || "An unexpected error occurred."}</p>
      </div>
    );
  }

  const stats = data?.data || {};

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Stat Cards */}
      <StatsGrid stats={stats} />

      {/* Orders Overview + Order Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <OrdersOverviewChart data={stats.ordersChartData} />
        <OrderStatusDonut data={stats.orderStatusData} />
      </div>

      {/* Recent Orders + Payments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrdersCard data={stats.recentOrders} />
        <RecentPaymentsCard data={stats.recentPayments} />
      </div>

      {/* Top Products + Notifications + Active Users */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TopProductsCard data={stats.topProducts} />
        <NotificationsCard data={stats.notifications} />
        <ActiveUsersCard data={stats.activeUsersChartData} activeUsersCount={stats.activeUsers} />
      </div>
    </div>
  );
}