"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cartApi, ordersApi } from "@/lib/api";
import { formatPKR } from "@/lib/format";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "CREDIT_CARD",
  });

  useEffect(() => {
    async function fetchCart() {
      try {
        const { data } = await cartApi.get();
        if (!data.cart || data.cart.items.length === 0) {
          router.push("/cart");
          return;
        }
        setCart(data.cart);
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      
      const orderData = {
        items: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: cart.totalAmount,
        shippingAddress: `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}`,
        paymentMethod: formData.paymentMethod,
      };

      await ordersApi.create(orderData);
      await cartApi.clear();
      
      // Redirect to some success page, or just home for now
      router.push("/collections?success=order_placed");
    } catch (err) {
      setError(err.message || "Failed to place order");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p>Loading checkout...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Address</label>
                <input
                  type="text"
                  name="shippingAddress"
                  required
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                />
              </div>
              
              <div className="pt-4">
                <label className="block text-sm text-neutral-600 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl"
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="PAYPAL">PayPal</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-[#800020] text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart?.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPKR(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPKR(cart?.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
