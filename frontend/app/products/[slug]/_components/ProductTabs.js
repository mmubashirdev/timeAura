"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ProductTabs({ product }) {
  const reviewCount = product.reviewCount ?? 24;
  const tabs = [
    "Description",
    "Specifications",
    "Shipping & Returns",
    `Reviews (${reviewCount})`,
  ];
  const [active, setActive] = useState(0);

  const features = [
    "Japanese quartz movement",
    "Stainless steel case",
    "Sapphire crystal glass",
    "Genuine leather strap",
    "5 ATM water resistance",
  ];

  const specs = {
    Movement: "Japanese Quartz",
    "Case Material": "Stainless Steel",
    "Case Diameter": "42mm",
    Glass: "Sapphire Crystal",
    "Water Resistance": "5 ATM",
    Warranty: "2 Years",
  };

  return (
    <section className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 my-10">
      <div className="flex flex-wrap gap-6 border-b border-neutral-200 mb-6">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === i
                ? "border-[#800020] text-[#800020]"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {active === 0 && (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="font-serif text-2xl mb-4 text-neutral-900">
              Timeless Craftsmanship
            </h3>
            <p className="text-neutral-600 leading-relaxed mb-6">
              The {product.name} is a statement of elegance and precision.
              Featuring a multi-function movement and a refined design, its
              built for those who value both tradition and performance.
            </p>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-neutral-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0" />{" "}
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-50">
            <Image
              src={product.images?.find(img => typeof img === 'string' && img.trim() !== '') || product.thumbnailImage || product.image || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      {active === 1 && (
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {Object.entries(specs).map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between border-b border-neutral-100 py-2.5"
            >
              <dt className="text-neutral-500 text-sm">{k}</dt>
              <dd className="font-medium text-sm text-neutral-900">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {active === 2 && (
        <div className="text-neutral-600 text-sm space-y-3 leading-relaxed">
          <p>
            <strong className="text-neutral-900">Shipping:</strong> Free
            worldwide shipping on all orders. Estimated delivery in 3–7 business
            days.
          </p>
          <p>
            <strong className="text-neutral-900">Returns:</strong> 30-day easy
            returns if youre not fully satisfied. Item must be unused and in
            original packaging.
          </p>
          <p>
            <strong className="text-neutral-900">Warranty:</strong> Every piece
            is backed by our 2-year international warranty.
          </p>
        </div>
      )}

      {active === 3 && (
        <p className="text-neutral-500 text-sm">
          Customer reviews coming soon.
        </p>
      )}
    </section>
  );
}
