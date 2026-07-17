"use client";

import { use, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";
import TrustStrip from "@/components/features/collections/TrustStrip";
import { productsApi } from "@/lib/api";

import Breadcrumb from "./_components/Breadcrumb";
import ProductGallery from "./_components/ProductGallery";
import ProductInfo from "./_components/ProductInfo";
import FeatureStrip from "./_components/FeatureStrip";
import ProductTabs from "./_components/ProductTabs";
import RelatedProducts from "./_components/RelatedProducts";

export default function ProductDetailPage({ params }) {
  // Next 16: params is a Promise
  const { slug } = use(params);
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const { data } = await productsApi.getBySlug(slug);
        setProduct(data.product);
        const { data: relatedData } = await productsApi.getRelated(slug);
        setRelated(relatedData.products || []);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full bg-[#FAFAFA] text-neutral-900 min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
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
