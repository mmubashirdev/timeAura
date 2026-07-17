"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { use } from "react";
import { productsApi } from "@/lib/api";
import ProductForm from "../../_components/ProductForm";

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { id } = use(params); // Next 16 param handling
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data } = await productsApi.getById(id);
        setProduct(data.product);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError(null);
      await productsApi.update(id, data);
      router.push("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to update product");
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}
      <ProductForm initialData={product} onSubmit={handleSubmit} isSubmitting={submitting} />
    </div>
  );
}
