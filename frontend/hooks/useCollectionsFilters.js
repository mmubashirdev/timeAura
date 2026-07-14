"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const DEFAULTS = {
  category: "all",
  min: 0,
  max: 100000,
  brands: [],
  materials: [],
  colors: [],
  rating: 0,
  sort: "featured",
  page: 1,
};

function parseList(sp, key) {
  const raw = sp.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

export function useCollectionsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const filters = useMemo(
    () => ({
      category: sp.get("category") || DEFAULTS.category,
      min: Number(sp.get("min") ?? DEFAULTS.min),
      max: Number(sp.get("max") ?? DEFAULTS.max),
      brands: parseList(sp, "brands"),
      materials: parseList(sp, "materials"),
      colors: parseList(sp, "colors"),
      rating: Number(sp.get("rating") ?? DEFAULTS.rating),
      sort: sp.get("sort") || DEFAULTS.sort,
      page: Number(sp.get("page") ?? DEFAULTS.page),
    }),
    [sp],
  );

  const update = useCallback(
    (patch) => {
      const next = new URLSearchParams(sp.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) {
          next.delete(k);
        } else if (Array.isArray(v)) {
          next.set(k, v.join(","));
        } else {
          next.set(k, String(v));
        }
      });
      // Any filter change (except sort/page nav itself) resets to page 1
      if (!("page" in patch)) next.delete("page");
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, sp],
  );

  const reset = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return { filters, update, reset };
}
