import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  const dynamicCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders?.toLocaleString() || "0",
      deltaPct: "12.5",
      deltaLabel: "from last week",
      iconType: "orders",
    },
    {
      label: "Total Revenue",
      value: `PKR ${stats.totalRevenue?.toLocaleString() || "0"}`,
      deltaPct: "18.4",
      deltaLabel: "from last week",
      iconType: "revenue",
    },
    {
      label: "Total Products",
      value: stats.totalProducts?.toLocaleString() || "0",
      deltaPct: "8.1",
      deltaLabel: "from last week",
      iconType: "products",
    },
    {
      label: "Active Users",
      value: stats.activeUsers?.toLocaleString() || "0",
      deltaPct: "15.2",
      deltaLabel: "from last week",
      iconType: "users",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {dynamicCards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}