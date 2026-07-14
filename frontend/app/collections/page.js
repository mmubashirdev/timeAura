"use client";

import { Suspense, useMemo, useState } from "react";

import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

import CollectionsHero from "@/components/features/collections/CollectionsHero";
import FiltersSidebar from "@/components/features/collections/FiltersSidebar";
import ProductsToolbar from "@/components/features/collections/ProductsToolbar";
import ProductGrid from "@/components/features/collections/ProductGrid";
import Pagination from "@/components/features/collections/Pagination";
import TrustStrip from "@/components/features/collections/TrustStrip";

import { PRODUCTS } from "@/lib/data/products";
import { useCollectionsFilters } from "@/hooks/useCollectionsFilters";

const PAGE_SIZE = 12;

function CollectionsContent() {
  const { filters, update, reset } = useCollectionsFilters();
  const [view, setView] = useState("grid");

  // 1. Filter (all criteria except sort/page)
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (p.price < filters.min || p.price > filters.max) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand))
        return false;
      if (filters.materials.length && !filters.materials.includes(p.material))
        return false;
      if (filters.colors.length && !filters.colors.includes(p.color))
        return false;
      if (filters.rating && p.rating < filters.rating) return false;
      return true;
    });
  }, [filters]);

  // 2. Sort
  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (filters.sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      default:
        return list;
    }
  }, [filtered, filters.sort]);

  // 3. Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const paged = sorted.slice(start, start + PAGE_SIZE);

  // 4. Sidebar counts (based on ALL products, unfiltered — showing how many exist)
  const counts = useMemo(() => {
    const c = {
      categories: { all: PRODUCTS.length },
      brands: {},
      materials: {},
    };
    for (const p of PRODUCTS) {
      c.categories[p.category] = (c.categories[p.category] || 0) + 1;
      c.brands[p.brand] = (c.brands[p.brand] || 0) + 1;
      c.materials[p.material] = (c.materials[p.material] || 0) + 1;
    }
    return c;
  }, []);

  return (
    <>
      <CollectionsHero />
      <section className="w-full bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
          <FiltersSidebar
            filters={filters}
            update={update}
            reset={reset}
            counts={counts}
          />
          <div className="flex-1 min-w-0">
            <ProductsToolbar
              filters={filters}
              update={update}
              total={sorted.length}
              from={sorted.length === 0 ? 0 : start + 1}
              to={Math.min(start + PAGE_SIZE, sorted.length)}
              view={view}
              onViewChange={setView}
            />
            <ProductGrid products={paged} view={view} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(n) => update({ page: n })}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function CollectionsPage() {
  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar activePath="/collections" />
      <Suspense fallback={null}>
        <CollectionsContent />
      </Suspense>
      <TrustStrip />
      <Footer />
    </main>
  );
}
