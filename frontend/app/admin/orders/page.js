"use client";

import { useState, useEffect } from "react";
import { ordersApi } from "@/lib/api";
import { Eye, Clock } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await ordersApi.list();
      setOrders(data.orders || []);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (!newStatus || !selectedOrder) return;

    try {
      await ordersApi.updateStatus(selectedOrder.id, { status: newStatus });
      setSelectedOrder(null);
      setNewStatus("");
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Order ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    {order.customer?.name || "Unknown"}
                    <div className="text-xs text-gray-500">{order.customer?.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setNewStatus(order.status);
                      }}
                      className="text-gray-600 hover:text-gray-900 p-2"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-500 mb-2">Order Information</h4>
                <p><strong>ID:</strong> {selectedOrder.id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-500 mb-2">Shipping Information</h4>
                <p className="whitespace-pre-wrap">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="col-span-2">
                <h4 className="font-medium text-gray-500 mb-2">Items</h4>
                <div className="border rounded-md divide-y">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex justify-between p-3">
                      <div>
                        <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-gray-50 p-4 rounded-md border">
                <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4" /> Timeline Status Editor
                </h4>
                <form onSubmit={handleStatusUpdate} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Update Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="REFUNDED">Refunded</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#6a001a]">
                    Update Status
                  </button>
                </form>

                <div className="mt-4 space-y-3">
                  {selectedOrder.history?.map((hist) => (
                    <div key={hist.id} className="flex gap-4 text-sm">
                      <div className="text-gray-500 w-32 shrink-0">{new Date(hist.createdAt).toLocaleString()}</div>
                      <div>
                        <span className="font-medium">{hist.status}</span>
                        {hist.comment && <span className="text-gray-500 ml-2">- {hist.comment}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
