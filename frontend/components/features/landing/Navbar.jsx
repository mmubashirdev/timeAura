"use client";

import Link from "next/link";
import { Search, ShoppingBag, ChevronDown, User, LogOut, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCurrentUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useState, useRef, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections", hasDropdown: true },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ activePath = "/" }) {
  const { count } = useCart();
  const { data, isLoading } = useCurrentUser();
  const user = data?.data?.user;
  const qc = useQueryClient();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-[#800020] flex items-center justify-center">
            <span className="font-serif text-lg font-bold text-[#800020]">
              A
            </span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold tracking-[0.15em] text-neutral-900">
              TIME AURA
            </div>
            <div className="text-[9px] tracking-[0.25em] text-neutral-500">
              CRAFTING MOMENTS
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = activePath === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  active
                    ? "text-[#800020] border-b-2 border-[#800020] pb-1"
                    : "text-neutral-700 hover:text-[#800020]"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-neutral-700 hover:text-[#800020]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>
          <Link
            href="/cart"
            className="relative text-neutral-700 hover:text-[#800020] mr-2"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#800020] text-white text-[10px] flex items-center justify-center font-semibold">
                {count}
              </span>
            )}
          </Link>

          {!isLoading && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold text-sm hover:bg-[#6a001a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800020]"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email || user.phone}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    View Profile
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <ShoppingBag className="w-4 h-4 mr-3 text-gray-400" />
                    My Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-red-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="h-10 px-5 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-xs font-semibold tracking-wide uppercase">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
