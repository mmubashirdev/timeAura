"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";
import TrustStrip from "@/components/features/collections/TrustStrip";

import { PRODUCTS } from "@/lib/data/products";

import Breadcrumb from "./_components/Breadcrumb";
import ProductGallery from "./_components/ProductGallery";
import ProductInfo from "./_components/ProductInfo";
import FeatureStrip from "./_components/FeatureStrip";
import ProductTabs from "./_components/ProductTabs";
import RelatedProducts from "./_components/RelatedProducts";

export default function ProductDetailPage({ params }) {
  // Next 16: params is a Promise
  const { slug } = use(params);

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category,
    ).slice(0, 6);
  }, [product]);

  if (!product) {
    return (
      <main className="w-full bg-[#FAFAFA] text-neutral-900 min-h-screen">
        <AnnouncementBar />
        <Navbar />
        <section className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="font-serif text-3xl mb-3">Product not found</h1>
          <p className="text-neutral-500 mb-6">
            The product youre looking for doesnt exist.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-[#800020] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-[#5c0016] transition-colors"
          >
            Back to Collections
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/collections" },
            {
              label: product.categoryLabel || product.category,
              href: `/collections?category=${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <FeatureStrip />

        <ProductTabs product={product} />

        <RelatedProducts products={related} />
      </section>

      <TrustStrip />
      <Footer />
    </main>
  );
}
