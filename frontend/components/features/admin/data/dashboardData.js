import {
  LayoutGrid,
  Package,
  CreditCard,
  Box,
  Users,
  Bell,
  Star,
  LayoutList,
  Ticket,
  BarChart2,
  Settings,
} from "lucide-react";

// ─── Sidebar Nav Items ───
export const navItems = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin", active: true },
  { label: "Orders", icon: Package, href: "/admin/orders" },
  { label: "Payments", icon: CreditCard, href: "/admin/payments" },
  { label: "Products", icon: Box, href: "/admin/products" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Notifications", icon: Bell, href: "/admin/notifications" },
  { label: "Reviews", icon: Star, href: "/admin/reviews" },
  { label: "Categories", icon: LayoutList, href: "/admin/categories" },
  { label: "Coupons", icon: Ticket, href: "/admin/coupons" },
  { label: "Reports", icon: BarChart2, href: "/admin/reports" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

// ─── Stat Cards ───
export const statCards = [
  {
    label: "Total Orders",
    value: "1,248",
    deltaPct: "12.5",
    deltaLabel: "from last week",
    iconType: "orders",
  },
  {
    label: "Total Revenue",
    value: "PKR 2,45,800",
    deltaPct: "18.4",
    deltaLabel: "from last week",
    iconType: "revenue",
  },
  {
    label: "Total Products",
    value: "326",
    deltaPct: "8.1",
    deltaLabel: "from last week",
    iconType: "products",
  },
  {
    label: "Active Users",
    value: "2,350",
    deltaPct: "15.2",
    deltaLabel: "from last week",
    iconType: "users",
  },
];

// ─── Orders Overview Chart ───
export const ordersChartData = [
  { day: "8 Jul", orders: 120 },
  { day: "9 Jul", orders: 180 },
  { day: "10 Jul", orders: 160 },
  { day: "11 Jul", orders: 210 },
  { day: "12 Jul", orders: 340 },
  { day: "13 Jul", orders: 260 },
  { day: "14 Jul", orders: 230 },
];

// ─── Order Status Donut ───
export const orderStatusData = [
  { name: "Pending", value: 320, pct: "25.6", color: "#E3A23A" },
  { name: "Processing", value: 450, pct: "36.1", color: "#7A1F2E" },
  { name: "Shipped", value: 280, pct: "22.4", color: "#A79E95" },
  { name: "Delivered", value: 198, pct: "15.9", color: "#4E9A6B" },
];

// ─── Status Color Map (shared) ───
export const STATUS_COLORS = {
  Pending: {
    bg: "bg-amber-50",
    text: "text-status-pending",
    dot: "#E3A23A",
    border: "border-amber-200",
  },
  Processing: {
    bg: "bg-red-50",
    text: "text-status-processing",
    dot: "#7A1F2E",
    border: "border-red-200",
  },
  Shipped: {
    bg: "bg-blue-50",
    text: "text-status-shipped",
    dot: "#5B8DEF",
    border: "border-blue-200",
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-status-delivered",
    dot: "#4E9A6B",
    border: "border-green-200",
  },
  Completed: {
    bg: "bg-green-50",
    text: "text-status-completed",
    dot: "#4E9A6B",
    border: "border-green-200",
  },
};

// ─── Recent Orders ───
export const recentOrders = [
  {
    id: "#ORD-1248",
    customer: "John Doe",
    date: "14 July, 2026",
    status: "Processing",
    amount: "PKR 12,500",
    img: "/images/products/watch-1.jpg",
  },
  {
    id: "#ORD-1247",
    customer: "Ali Khan",
    date: "14 July, 2026",
    status: "Shipped",
    amount: "PKR 8,750",
    img: "/images/products/watch-2.jpg",
  },
  {
    id: "#ORD-1246",
    customer: "Sara Ali",
    date: "13 July, 2026",
    status: "Delivered",
    amount: "PKR 6,250",
    img: "/images/products/wallet-1.jpg",
  },
  {
    id: "#ORD-1245",
    customer: "Hamza Ahmed",
    date: "13 July, 2026",
    status: "Pending",
    amount: "PKR 15,000",
    img: "/images/products/perfume-1.jpg",
  },
  {
    id: "#ORD-1244",
    customer: "Zain Malik",
    date: "12 July, 2026",
    status: "Processing",
    amount: "PKR 15,000",
    img: "/images/products/watch-3.jpg",
  },
];

// ─── Recent Payments ───
export const recentPayments = [
  {
    id: "#PAY-1248",
    customer: "John Doe",
    date: "14 July, 2026",
    amount: "PKR 12,500",
    status: "Completed",
  },
  {
    id: "#PAY-1247",
    customer: "Ali Khan",
    date: "14 July, 2026",
    amount: "PKR 8,750",
    status: "Completed",
  },
  {
    id: "#PAY-1246",
    customer: "Sara Ali",
    date: "13 July, 2026",
    amount: "PKR 6,250",
    status: "Completed",
  },
  {
    id: "#PAY-1245",
    customer: "Hamza Ahmed",
    date: "13 July, 2026",
    amount: "PKR 15,000",
    status: "Completed",
  },
  {
    id: "#PAY-1244",
    customer: "Zain Malik",
    date: "12 July, 2026",
    amount: "PKR 9,500",
    status: "Pending",
  },
];

// ─── Top Products ───
export const topProducts = [
  {
    name: "Time Aura Chrono",
    category: "Watches",
    sales: 156,
    img: "/images/products/watch-1.jpg",
  },
  {
    name: "Leather Wallet",
    category: "Accessories",
    sales: 112,
    img: "/images/products/wallet-1.jpg",
  },
  {
    name: "Oud Noir Perfume",
    category: "Perfumes",
    sales: 98,
    img: "/images/products/perfume-1.jpg",
  },
  {
    name: "Time Aura Elite",
    category: "Watches",
    sales: 88,
    img: "/images/products/watch-2.jpg",
  },
];

// ─── Notifications ───
export const notifications = [
  {
    message: "New order #ORD-1248 received",
    time: "2 mins ago",
    type: "order",
  },
  {
    message: "Payment of PKR 12,500 completed",
    time: "10 mins ago",
    type: "payment",
  },
  {
    message: "Product 'Time Aura Elite' is out of stock",
    time: "1 hour ago",
    type: "warning",
  },
  {
    message: "New user Ali Khan registered",
    time: "2 hours ago",
    type: "user",
  },
];

// ─── Active Users Chart ───
export const activeUsersChartData = [
  { day: "8 Jul", users: 1200 },
  { day: "9 Jul", users: 1800 },
  { day: "10 Jul", users: 1500 },
  { day: "11 Jul", users: 2100 },
  { day: "12 Jul", users: 2800 },
  { day: "13 Jul", users: 2400 },
  { day: "14 Jul", users: 2350 },
];