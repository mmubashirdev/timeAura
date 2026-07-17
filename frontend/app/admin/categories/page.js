"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { categoriesApi } from "@/lib/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.list();
      setCategories(data.categories || []);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await categoriesApi.delete(id);
        fetchCategories();
      } catch (err) {
        alert("Failed to delete category");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-[#800020] text-white hover:bg-[#6a001a] h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  Loading categories...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-gray-500">{category.description || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800 p-2"
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
    </div>
  );
}
