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
          title="Lahore Garrison University"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.188129237966!2d74.44005497479702!3d31.464010649925747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391908dd6138ade3%3A0xa6cc469044e1fbc1!2sLahore%20Garrison%20University.!5e0!3m2!1sen!2s!4v1783964176217!5m2!1sen!2s"
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
