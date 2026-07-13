"use client";

import { Truck } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#5c0016] text-white text-xs">
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span className="tracking-wide">
            Free Worldwide Shipping on All Orders
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>2 Year Warranty</span>
          <span className="opacity-60">|</span>
          <span>Easy Returns</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">Follow Us</span>
          <FaInstagram size={18} />
          <FaFacebookF size={18} />
          <FaYoutube size={18} />
        </div>
      </div>
    </div>
  );
}
