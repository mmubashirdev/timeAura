"use client";

import { useState, useEffect } from "react";
import { customersApi } from "@/lib/api";

export default function AdminUsersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const { data } = await customersApi.list();
        setCustomers(data.customers || []);
      } catch (err) {
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Customer Log</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Loading customers...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-500">{customer.orders?.length || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
