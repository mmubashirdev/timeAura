"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Phone,
  Mail,
  MapPin,
  Wallet,
  Smartphone,
  Landmark,
  Banknote,
} from "lucide-react";

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

// Pakistan-only payment methods, mirrors backend PaymentMethod enum.
const PAYMENT_METHODS = [
  { label: "JazzCash", icon: Smartphone },
  { label: "EasyPaisa", icon: Wallet },
  { label: "Bank Transfer", icon: Landmark },
  { label: "Cash on Delivery", icon: Banknote },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-3 py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="leading-tight">
              <div className="font-serif text-lg font-bold tracking-[0.15em]">
                TIME AURA
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4 max-w-xs">
            Redefining elegance with premium watches, wallets, and perfumes
            crafted for those who value timeless quality and style.
          </p>
          <div className="flex gap-3">
            {[FaInstagram, FaFacebook, FaYoutube, FaXTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-colors"
                aria-label="Social"
              >
                <Icon className="w-4 h-4" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

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

        <div>
          <h4 className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 mb-4">
            CONTACT US
          </h4>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <Phone
                className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                strokeWidth={1.8}
              />
              +92 300 1234567
            </li>
            <li className="flex items-start gap-2">
              <Mail
                className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                strokeWidth={1.8}
              />
              support@timeaura.pk
            </li>
            <li className="flex items-start gap-2">
              <MapPin
                className="w-4 h-4 text-[#800020] shrink-0 mt-0.5"
                strokeWidth={1.8}
              />
              <span>
                MM Alam Road,
                <br />
                Gulberg III, Lahore, Pakistan
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 mb-4">
            OUR LOCATION
          </h4>
          <div className="w-full h-32 md:h-40 rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
            <iframe
              src="https://maps.google.com/maps?q=MM%20Alam%20Road,%20Gulberg%20III,%20Lahore,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 Time Aura. All Rights Reserved.</p>
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
          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-2">
              {PAYMENT_METHODS.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  title={label}
                  className="flex items-center gap-1 px-2 h-7 rounded-md bg-white border border-neutral-200 text-[10px] font-medium text-neutral-700"
                >
                  <Icon
                    className="w-3.5 h-3.5 text-[#800020]"
                    strokeWidth={1.8}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
