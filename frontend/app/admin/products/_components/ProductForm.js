"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadsApi, categoriesApi } from "@/lib/api";
import { X, Upload, Plus } from "lucide-react";

export default function ProductForm({ initialData, onSubmit, isSubmitting }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    categoryId: "",
    brand: "",
    sku: "",
    price: "",
    discountPrice: "",
    stockQuantity: "",
    status: "DRAFT",
    images: [],
    color: "",
    material: "",
    weight: "",
    dimensions: "",
    warranty: "",
    featuredProduct: false,
    specifications: {},
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await categoriesApi.list();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        shortDescription: initialData.shortDescription || "",
        categoryId: initialData.categoryId || "",
        brand: initialData.brand || "",
        sku: initialData.sku || "",
        price: initialData.price || "",
        discountPrice: initialData.discountPrice || "",
        stockQuantity: initialData.stockQuantity || "",
        status: initialData.status || "DRAFT",
        images: initialData.images || [],
        color: initialData.color || "",
        material: initialData.material || "",
        weight: initialData.weight || "",
        dimensions: initialData.dimensions || "",
        warranty: initialData.warranty || "",
        featuredProduct: !!initialData.featuredProduct,
        specifications: initialData.specifications || {},
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const val = type === "checkbox" ? checked : value;
      const updated = { ...prev, [name]: val };
      if (name === "name" && !initialData) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await uploadsApi.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, data.url],
      }));
    } catch (err) {
      alert(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    if (!specKey || !specValue) return;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [specKey]: specValue,
      },
    }));
    setSpecKey("");
    setSpecValue("");
  };

  const removeSpecification = (key) => {
    setFormData((prev) => {
      const specs = { ...prev.specifications };
      delete specs[key];
      return { ...prev, specifications: specs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out any null/undefined/falsy entries that may have crept in
    const cleanedImages = formData.images.filter((img) => typeof img === "string" && img.length > 0);
    const payload = {
      ...formData,
      images: cleanedImages,
      categoryId: parseInt(formData.categoryId, 10),
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      stockQuantity: parseInt(formData.stockQuantity, 10),
      weight: formData.weight ? parseFloat(formData.weight) : null,
      thumbnailImage: cleanedImages[0] || "/images/products/placeholder.png",
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Info */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Pricing & Inventory</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR) *</label>
              <input type="number" step="1" name="price" required value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
              <input type="number" step="1" name="discountPrice" value={formData.discountPrice} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input type="number" name="stockQuantity" required value={formData.stockQuantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
              <input type="text" name="sku" required value={formData.sku} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        {/* Attributes & Organization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Attributes & Organization</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="categoryId" required value={formData.categoryId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
              <input type="text" name="color" required value={formData.color} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material *</label>
              <input type="text" name="material" required value={formData.material} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="e.g. Leather" />
            </div>
          </div>
        </div>

        {/* Shipping & Specs */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2">Physical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (e.g. 12x10x5 cm)</label>
              <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Details</label>
              <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-3 flex items-center">
              <input type="checkbox" id="featuredProduct" name="featuredProduct" checked={formData.featuredProduct} onChange={handleChange} className="h-4 w-4 text-[#800020] border-gray-300 rounded focus:ring-[#800020]" />
              <label htmlFor="featuredProduct" className="ml-2 block text-sm font-medium text-gray-900">Mark as Featured Product</label>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2">Media</h3>
          <div className="flex flex-wrap gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative h-24 w-24 border rounded overflow-hidden group">
                <img src={img} alt="Product" className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="h-24 w-24 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">{uploading ? "Uploading..." : "Upload"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-medium border-b pb-2">Specifications</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(formData.specifications).map(([key, val]) => (
              <div key={key} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                <span className="font-medium mr-1">{key}:</span>
                <span className="text-gray-600 mr-2">{val}</span>
                <button type="button" onClick={() => removeSpecification(key)} className="text-gray-500 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attribute Name</label>
              <input type="text" value={specKey} onChange={(e) => setSpecKey(e.target.value)} placeholder="e.g. Case Material" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input type="text" value={specValue} onChange={(e) => setSpecValue(e.target.value)} placeholder="e.g. Stainless Steel" className="w-full px-3 py-2 border rounded-md" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())} />
            </div>
            <button type="button" onClick={addSpecification} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-colors h-10 w-10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

      </div>

      <div className="border-t pt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#800020] text-white rounded-md font-medium hover:bg-[#6a001a] disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
