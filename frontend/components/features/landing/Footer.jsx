"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const COLUMNS = [
  {
    title: "SHOP",
    links: ["Watches", "Wallets", "Perfumes", "Best Sellers", "New Arrivals"],
  },
  {
    title: "COMPANY",
    links: [
      "About Us",
      "Our Story",
      "Careers",
      "Sustainability",
      "News & Blog",
    ],
  },
  {
    title: "CUSTOMER SERVICE",
    links: [
      "Contact Us",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Warranty",
      "FAQs",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-[#800020] flex items-center justify-center">
              <span className="font-serif text-lg font-bold text-[#800020]">
                A
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-bold tracking-[0.15em]">
                TIME AURA
              </div>
              <div className="text-[9px] tracking-[0.25em] text-neutral-500">
                CRAFTING MOMENTS
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4 max-w-xs">
            SHOP PREMIUM. SHOP SMART.ches, wallets, and perfumes SHOP PREMIUM.
            SHOP SMART. those who value timeless quality and style.
          </p>
          <div className="flex gap-3">
            {[FaInstagram, FaFacebookF, FaYoutube, FaXTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-colors"
                  aria-label="Social"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </a>
              ),
            )}
          </div>
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-neutral-600 hover:text-[#800020] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 mb-2">
            CONTACT US
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-spacebetween">
            {/* Contact details */}
            <ul className="space-y-3 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <Phone
                  className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                +923000000000
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                timeaura-online@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <span>
                  LGU
                  <br />
                  Lahore
                </span>
              </li>
            </ul>

            {/* Map */}
            <div className="w-full">
              <iframe
                width="100%"
                height="220"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                style={{ border: 0 }}
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&amp;q=lahore%20garrison%20university&amp;maptype=roadmap&amp;zoom=14"
                title="Lahore Garrison University Map"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>mmubashirdev © 2026 Time Aura. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#800020]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#800020]">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#800020]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
