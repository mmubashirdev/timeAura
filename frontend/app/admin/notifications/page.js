"use client";

import { useState, useEffect } from "react";
import { notificationsApi } from "@/lib/api";
import { Bell, CheckCircle2 } from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await notificationsApi.list();
      setNotifications(data.notifications || []);
    } catch (err) {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notificationsApi.markRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      alert("Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      alert("Failed to mark all as read");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-500" />
          Alerts History
        </h2>
        <button
          onClick={handleMarkAllRead}
          className="text-sm text-[#800020] hover:underline font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading notifications...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications found.</div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={`p-4 flex gap-4 ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
              <div className="mt-1">
                {notification.type === 'ORDER_CREATED' ? (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">🛍️</div>
                ) : notification.type === 'LOW_STOCK' ? (
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">⚠️</div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">🔔</div>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${notification.isRead ? 'text-gray-900' : 'text-blue-900'}`}>
                  {notification.title}
                </h4>
                <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-blue-800'}`}>
                  {notification.message}
                </p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
              {!notification.isRead && (
                <button
                  onClick={() => handleMarkRead(notification.id)}
                  className="text-gray-400 hover:text-green-600 flex items-center justify-center h-8 w-8"
                  title="Mark as read"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
