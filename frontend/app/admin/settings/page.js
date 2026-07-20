"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Store Settings</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">General Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" defaultValue="TimeAura" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" defaultValue="admin@timeaura.com" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Payment Methods</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-[#800020] focus:ring-[#800020]" />
              Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-[#800020] focus:ring-[#800020]" />
              JAZZCASH
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-[#800020] focus:ring-[#800020]" />
              Bank Transfer
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4">Shipping Zones</h3>
          <div className="p-4 border rounded-md bg-gray-50 text-sm text-gray-600">
            Shipping zones configuration will go here.
          </div>
        </div>

        <div className="border-t pt-4 flex items-center justify-end gap-4">
          {saved && <span className="text-green-600 text-sm font-medium">Settings saved successfully!</span>}
          <button type="submit" className="bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#6a001a]">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
