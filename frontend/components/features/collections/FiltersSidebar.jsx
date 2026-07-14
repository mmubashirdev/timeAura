"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/format";
import {
  CATEGORIES,
  BRANDS_LIST,
  MATERIALS_LIST,
  COLORS_LIST,
} from "@/lib/data/products";

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-neutral-900">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function CheckList({ items, selected, onToggle, counts }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => {
        const key = typeof it === "string" ? it : it.key;
        const label = typeof it === "string" ? it : it.label;
        const isActive = selected.includes(key);
        return (
          <li key={key}>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={isActive}
                onCheckedChange={() => onToggle(key)}
              />
              <span
                className={`text-sm flex-1 ${isActive ? "text-[#800020] font-medium" : "text-neutral-700 group-hover:text-neutral-900"}`}
              >
                {label}
              </span>
              {counts?.[key] != null && (
                <span className="text-xs text-neutral-400">
                  ({counts[key]})
                </span>
              )}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default function FiltersSidebar({ filters, update, reset, counts }) {
  const toggleInList = (listKey, value) => {
    const list = filters[listKey];
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    update({ [listKey]: next });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        <button
          onClick={reset}
          className="text-xs font-semibold text-[#800020] hover:underline"
        >
          Clear All
        </button>
      </div>

      <Section title="Categories">
        <ul className="space-y-1">
          {CATEGORIES.map((c) => {
            const active = filters.category === c.key;
            return (
              <li key={c.key}>
                <button
                  onClick={() =>
                    update({ category: c.key === "all" ? null : c.key })
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-[#faf1ee] text-[#800020] font-semibold"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span>{c.label}</span>
                  {counts?.categories?.[c.key] != null && (
                    <span
                      className={`text-xs ${active ? "text-[#800020]" : "text-neutral-400"}`}
                    >
                      ({counts.categories[c.key]})
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Price Range">
        <div className="flex gap-2 mt-2">
          <div className="flex items-center gap-1 flex-1 border border-neutral-200 rounded-lg px-2">
            <span className="text-xs text-neutral-500">Rs</span>
            <input
              type="number"
              min={0}
              value={filters.min}
              onChange={(e) => update({ min: Number(e.target.value) || 0 })}
              className="w-full py-2 text-sm outline-none bg-transparent"
              aria-label="Minimum price"
            />
          </div>
          <div className="flex items-center gap-1 flex-1 border border-neutral-200 rounded-lg px-2">
            <span className="text-xs text-neutral-500">Rs</span>
            <input
              type="number"
              min={0}
              value={filters.max}
              onChange={(e) => update({ max: Number(e.target.value) || 0 })}
              className="w-full py-2 text-sm outline-none bg-transparent"
              aria-label="Maximum price"
            />
          </div>
        </div>
        <p className="text-[11px] text-neutral-500 mt-2">
          {formatPKR(filters.min)} — {formatPKR(filters.max)}
        </p>
      </Section>

      <Section title="Brand">
        <CheckList
          items={BRANDS_LIST}
          selected={filters.brands}
          onToggle={(v) => toggleInList("brands", v)}
          counts={counts?.brands}
        />
      </Section>

      <Section title="Material">
        <CheckList
          items={MATERIALS_LIST}
          selected={filters.materials}
          onToggle={(v) => toggleInList("materials", v)}
          counts={counts?.materials}
        />
      </Section>

      <Section title="Color">
        <ul className="flex flex-wrap gap-2">
          {COLORS_LIST.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <li key={c.name}>
                <button
                  onClick={() => toggleInList("colors", c.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${active ? "border-[#800020] ring-2 ring-[#800020]/20" : "border-neutral-200"}`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                  aria-pressed={active}
                />
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Rating">
        <ul className="space-y-2">
          {[4, 3, 2, 1].map((r) => {
            const active = filters.rating === r;
            return (
              <li key={r}>
                <button
                  onClick={() => update({ rating: active ? null : r })}
                  className={`flex items-center gap-2 w-full text-left ${active ? "text-[#800020]" : "text-neutral-700 hover:text-neutral-900"}`}
                  aria-pressed={active}
                >
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < r ? "text-[#C9A14A] fill-[#C9A14A]" : "text-neutral-300"}`}
                      />
                    ))}
                  </span>
                  <span className="text-xs">& up</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      <div className="mt-5">
        <Button
          variant="outline"
          onClick={reset}
          className="w-full h-10 rounded-xl gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </Button>
      </div>
    </aside>
  );
}
