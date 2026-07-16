"use client";
import { useState } from "react";
import { LogOut, ChevronDown, X, Watch } from "lucide-react";
import { navItems } from "../data/dashboardData";

export default function Sidebar({ isOpen, onClose }) {
  const [expandAdmin, setExpandAdmin] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-cream-panel border-r border-border transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/40">
            <Watch className="h-5 w-5 text-maroon" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-lg font-bold uppercase tracking-wider text-maroon">
              Time Aura
            </h1>
            <p className="text-[8px] uppercase tracking-[0.2em] text-ink-400">
              Timeless style, precision you trust.
            </p>
          </div>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-ink-400 hover:bg-cream-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-maroon text-white shadow-sm"
                        : "text-ink-600 hover:bg-cream-muted hover:text-ink-900"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin card + Logout */}
        <div className="border-t border-border px-3 py-4">
          <button
            onClick={() => setExpandAdmin(!expandAdmin)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-cream-muted"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-cream-muted">
              <img
                src="/images/avatar.jpg"
                alt="Admin"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Admin&background=7A1F2E&color=fff&size=36";
                }}
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-ink-900">Admin</p>
              <p className="text-[11px] text-ink-400">admin@timeaura.com</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-ink-400 transition-transform ${
                expandAdmin ? "rotate-180" : ""
              }`}
            />
          </button>

          <a
            href="/login"
            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-cream-muted hover:text-ink-900"
          >
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
            Logout
          </a>
        </div>
      </aside>
    </>
  );
}