"use client";

import Link from "next/link";
import { Search, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/"},
  { label: "Collections", href: "/collections", hasDropdown: true },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
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

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                link.active
                  ? "text-[#800020] border-b-2 border-[#800020] pb-1"
                  : "text-neutral-700 hover:text-[#800020]"
              }`}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-4">
          <button
            className="text-neutral-700 hover:text-[#800020]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" strokeWidth={1.8} />
          </button>
          <button
            className="relative text-neutral-700 hover:text-[#800020]"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#800020] text-white text-[10px] flex items-center justify-center font-semibold">
              0
            </span>
          </button>
          <Button className="h-10 px-5 rounded-xl bg-[#5c0016] hover:bg-[#4a0011] text-white text-xs font-semibold tracking-wide uppercase">
            Explore Collection
          </Button>
        </div>
      </div>
    </nav>
  );
}
