"use client";

import {
  FaTruck,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#5c0016] text-white text-xs">
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaTruck className="w-3.5 h-3.5" strokeWidth={1.8} />
          <span className="tracking-wide">Free Shipping Across Pakistan</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>2 Year Warranty</span>
          <span className="opacity-60">|</span>
          <span>Easy Returns</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">Follow Us</span>
          <FaInstagram className="w-3.5 h-3.5" strokeWidth={1.8} />
          <FaFacebook className="w-3.5 h-3.5" strokeWidth={1.8} />
          <FaYoutube className="w-3.5 h-3.5" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
