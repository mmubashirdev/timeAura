"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Warehouse,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Skip auth check on the login page itself
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("adminUser");

    if (!token || !storedUser) {
      router.replace("/admin/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user?.role !== "ADMIN") {
        router.replace("/admin/login");
        return;
      }
      setAdminUser(user);
    } catch {
      router.replace("/admin/login");
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  // Render login page without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show nothing while we verify the session
  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-serif font-bold text-[#800020]">
            TimeAura Admin
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#800020] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          {adminUser && (
            <div className="px-4 py-2 mb-2">
              <p className="text-xs font-medium text-gray-900 truncate">{adminUser.name}</p>
              <p className="text-xs text-gray-500 truncate">{adminUser.email}</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm z-10 h-16 flex items-center px-8 justify-between">
          <h1 className="text-xl font-semibold">
            {navigation.find(
              (item) =>
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
            )?.name || "Dashboard"}
          </h1>
          <span className="text-xs bg-[#800020] text-white px-2 py-1 rounded font-medium">
            ADMIN
          </span>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
