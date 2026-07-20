"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { productsApi, categoriesApi } from "@/lib/api";
import { formatPKR } from "@/lib/format";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await categoriesApi.list();
      setCategories(data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        page,
        pageSize: 10,
        sort,
        includeInactive: true, // admin list includes soft deleted/inactive
        ...(search && { search }),
        ...(category && { category }),
        ...(status && { status }),
      };
      const { data } = await productsApi.list(params);
      setProducts(data.items || []);
      setTotal(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, sort, category, status]); // Note: excluding 'search' here to trigger on submit instead

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1 on new search
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await productsApi.delete(id);
        fetchProducts(); // reload
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-[#800020] text-white hover:bg-[#6a001a] h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#800020]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#800020]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#800020]"
        >
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="OUT_OF_STOCK">Out of Stock</option>
        </select>

        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#800020]"
        >
          <option value="newest">Newest First</option>
          <option value="featured">Featured First</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-gray-500 text-xs">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatPKR(product.price)}</td>
                  <td className="px-6 py-4">{product.stockQuantity}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : product.status === "DRAFT"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                    {!product.isActive && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                        Deleted
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        disabled={!product.isActive}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && products.length > 0 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} products
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
