"use client";
import { Menu, CalendarDays, ChevronDown, Bell } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="flex items-start justify-between border-b border-border bg-cream-panel px-4 py-4 md:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-start gap-3">
        <button
          onClick={onMenuClick}
          className="mt-1 rounded-lg p-1.5 text-ink-600 hover:bg-cream-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="font-serif text-xl font-semibold text-ink-900 md:text-2xl lg:text-3xl">
            Welcome back, Admin
          </h2>
          <p className="mt-0.5 text-sm text-ink-600">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Date picker pill */}
        <button className="hidden items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:bg-cream-muted sm:flex">
          <CalendarDays className="h-4 w-4 text-ink-400" />
          <span>14 July, 2026</span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
        </button>

        {/* Mobile date icon */}
        <button className="rounded-full border border-border bg-white p-2 sm:hidden">
          <CalendarDays className="h-4 w-4 text-ink-400" />
        </button>

        {/* Notification bell */}
        <button className="relative rounded-full border border-border bg-white p-2 transition-colors hover:bg-cream-muted">
          <Bell className="h-4 w-4 text-ink-600" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}