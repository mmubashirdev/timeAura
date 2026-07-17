"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productsApi } from "@/lib/api";
import ProductForm from "../_components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);
      await productsApi.create(data);
      router.push("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to create product");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}
      <ProductForm onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
}
