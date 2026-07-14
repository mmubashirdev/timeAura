"use client";

import { useState } from "react";
import { ChevronDown, LayoutGrid, List } from "lucide-react";

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Highest Rated" },
  { key: "newest", label: "Newest" },
];

export default function ProductsToolbar({
  filters,
  update,
  total,
  from,
  to,
  view,
  onViewChange,
}) {
  const [open, setOpen] = useState(false);
  const current =
    SORT_OPTIONS.find((o) => o.key === filters.sort) || SORT_OPTIONS[0];

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-sm text-neutral-700 hover:text-[#800020]"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-neutral-500">Sort by:</span>
          <span className="font-semibold">{current.label}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        {open && (
          <ul
            className="absolute top-full left-0 mt-1 z-20 bg-white rounded-lg border border-neutral-200 shadow-lg w-52 py-1"
            role="listbox"
          >
            {SORT_OPTIONS.map((opt) => (
              <li key={opt.key}>
                <button
                  onClick={() => {
                    update({ sort: opt.key });
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 ${
                    filters.sort === opt.key
                      ? "text-[#800020] font-semibold"
                      : "text-neutral-700"
                  }`}
                  role="option"
                  aria-selected={filters.sort === opt.key}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-neutral-500">
          Showing {from}-{to} of {total} products
        </span>
        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 ${view === "grid" ? "bg-[#800020] text-white" : "text-neutral-500 hover:bg-neutral-50"}`}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 ${view === "list" ? "bg-[#800020] text-white" : "text-neutral-500 hover:bg-neutral-50"}`}
            aria-label="List view"
            aria-pressed={view === "list"}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
