"use client";

import { useState, useEffect } from "react";
import { productsApi } from "@/lib/api";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        // Fetch all products or a specific inventory endpoint if it existed
        // We'll reuse the products list but could sort by stock ascending
        const { data } = await productsApi.list({ sort: "stock_asc", pageSize: 50 });
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const handleAdjustStock = async (id, currentStock) => {
    const newStock = prompt("Enter new stock quantity:", currentStock);
    if (newStock !== null && !isNaN(parseInt(newStock, 10))) {
      try {
        await productsApi.adjustStock(id, { quantity: parseInt(newStock, 10) });
        // Update locally
        setProducts(products.map(p => p.id === id ? { ...p, stockQuantity: parseInt(newStock, 10) } : p));
      } catch (err) {
        alert("Failed to adjust stock");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Inventory Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">SKU</th>
              <th className="px-6 py-3 font-medium text-center">Stock Level</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Loading inventory...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isLowStock = product.stockQuantity <= 5;
                const isOutOfStock = product.stockQuantity === 0;

                return (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold text-lg">{product.stockQuantity}</span>
                        {isOutOfStock ? (
                          <span className="flex items-center text-red-600 text-xs font-medium"><AlertTriangle className="w-3 h-3 mr-1" /> Out</span>
                        ) : isLowStock ? (
                          <span className="flex items-center text-amber-500 text-xs font-medium"><AlertTriangle className="w-3 h-3 mr-1" /> Low</span>
                        ) : (
                          <span className="flex items-center text-green-600 text-xs font-medium"><CheckCircle2 className="w-3 h-3 mr-1" /> OK</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleAdjustStock(product.id, product.stockQuantity)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Adjust
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
