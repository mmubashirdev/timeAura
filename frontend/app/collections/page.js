"use client";

import { Suspense, useEffect, useState } from "react";

import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

import CollectionsHero from "@/components/features/collections/CollectionsHero";
import FiltersSidebar from "@/components/features/collections/FiltersSidebar";
import ProductsToolbar from "@/components/features/collections/ProductsToolbar";
import ProductGrid from "@/components/features/collections/ProductGrid";
import Pagination from "@/components/features/collections/Pagination";
import TrustStrip from "@/components/features/collections/TrustStrip";

import { productsApi } from "@/lib/api";
import { useCollectionsFilters } from "@/hooks/useCollectionsFilters";

const PAGE_SIZE = 12;

function CollectionsContent() {
  const { filters, update, reset } = useCollectionsFilters();
  const [view, setView] = useState("grid");

  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState({
    categories: { all: 0 },
    brands: {},
    materials: {},
  });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      try {
        // Sidebar counts / filter option counts
        const filtersRes = await productsApi.filters();
        const f = filtersRes?.data || filtersRes;
        if (!ignore) {
          setCounts({
            categories: f?.categories ?? { all: f?.totalCount ?? 0 },
            brands: f?.brands ?? {},
            materials: f?.materials ?? {},
          });
        }

        const params = {
          category: filters.category === "all" ? null : filters.category,
          min: filters.min,
          max: filters.max,
          brands: filters.brands.length ? filters.brands : null,
          materials: filters.materials.length ? filters.materials : null,
          colors: filters.colors.length ? filters.colors : null,
          rating: filters.rating ?? null,
          sort: filters.sort,
          page: filters.page,
          pageSize: PAGE_SIZE,
        };

        const res = await productsApi.list(params);
        if (ignore) return;

        const dataObj = res?.data || res;
        const items = Array.isArray(dataObj) ? dataObj : (dataObj?.items ?? []);
        const pagination = dataObj?.pagination || {};
        const t = Array.isArray(dataObj)
          ? dataObj.length
          : (pagination.total ?? dataObj?.total ?? dataObj?.totalCount ?? items.length);

        setProducts(items);
        setTotal(t);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [filters]);

  const page = Math.max(1, filters.page);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

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
              total={total}
              from={from}
              to={to}
              view={view}
              onViewChange={setView}
            />
            <ProductGrid products={products} view={view} isLoading={loading} />
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
