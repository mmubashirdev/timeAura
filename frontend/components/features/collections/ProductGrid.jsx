"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products, view }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-2xl text-neutral-900 mb-2">
          No products found
        </p>
        <p className="text-sm text-neutral-500">
          Try adjusting your filters or resetting them.
        </p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} view="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
