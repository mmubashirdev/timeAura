"use client";

import { MapPin } from "lucide-react";

export default function LocationMap() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 flex flex-col h-full">
      <h2 className="font-serif text-2xl text-neutral-900 mb-1">
        Our Location
      </h2>
      <p className="text-sm text-neutral-600 mb-6">
        Visit our office or drop us a letter. We&apos;d love to hear from you!
      </p>

      <div className="relative flex-1 min-h-[320px] rounded-xl overflow-hidden bg-[#f3ede6]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27244.596681836232!2d74.13754856384551!3d31.398291699235575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff079b2e55fb%3A0xb89f575b49294708!2sShahkam%20Chowk%2C%20Canal%20Bank%20Rd%2C%20Bahria%20Town%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1785007542367!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full"
        />

        <div className="absolute left-1/2 top-[44%] -translate-x-1/2">
          <div className="w-9 h-9 rounded-full bg-[#5c0016] flex items-center justify-center shadow-lg">
            <MapPin
              className="w-5 h-5 text-white"
              strokeWidth={2}
              fill="currentColor"
            />
          </div>
        </div>

        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-[260px] bg-white rounded-xl shadow-lg p-3">
          <p className="text-xs font-semibold text-neutral-900 mb-0.5">
            Lahore Garrison University
          </p>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Lahore, Pakistan
          </p>
        </div>
      </div>
    </div>
  );
}
