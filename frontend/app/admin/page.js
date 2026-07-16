"use client";
import { useState } from "react";
import Sidebar from "@/components/features/admin/components/Sidebar";
import Topbar from "@/components/features/admin/components/Topbar";
import StatsGrid from "@/components/features/admin/components/StatsGrid";
import OrdersOverviewChart from "@/components/features/admin/components/OrdersOverviewChart";
import OrderStatusDonut from "@/components/features/admin/components/OrderStatusDonut";
import RecentOrdersCard from "@/components/features/admin/components/RecentOrdersCard";
import RecentPaymentsCard from "@/components/features/admin/components/RecentPaymentsCard";
import TopProductsCard from "@/components/features/admin/components/TopProductsCard";
import NotificationsCard from "@/components/features/admin/components/NotificationsCard";
import ActiveUsersCard from "@/components/features/admin/components/ActiveUsersCard";
import Footer from "@/components/features/admin/components/Footer";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream-bg">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
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
        </main>

        <Footer />
      </div>
    </div>
  );
}