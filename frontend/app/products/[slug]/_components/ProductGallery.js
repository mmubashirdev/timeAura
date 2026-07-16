"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ZoomIn, Box, ChevronDown, ChevronUp } from "lucide-react";

const Product3DViewer = dynamic(() => import("./Product3DViewer"), {
  ssr: false,
});

export default function ProductGallery({ product }) {
  // Build a small gallery from the single product.image (mock catalog only has one)
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [thumbStart, setThumbStart] = useState(0);
  const VISIBLE_THUMBS = 5;

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-2 w-20 shrink-0">
        <button
          onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
          disabled={thumbStart === 0}
          className="w-full flex items-center justify-center py-1 text-neutral-400 hover:text-[#800020] disabled:opacity-30"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {images.slice(thumbStart, thumbStart + VISIBLE_THUMBS).map((img, i) => {
          const idx = thumbStart + i;
          return (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-neutral-50 transition-all ${
                active === idx
                  ? "border-[#800020]"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} ${idx + 1}`}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </button>
          );
        })}

        <button
          onClick={() =>
            setThumbStart((s) =>
              Math.min(images.length - VISIBLE_THUMBS, s + 1),
            )
          }
          disabled={thumbStart + VISIBLE_THUMBS >= images.length}
          className="w-full flex items-center justify-center py-1 text-neutral-400 hover:text-[#800020] disabled:opacity-30"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Main image */}
      <div className="relative flex-1 bg-white border border-neutral-100 rounded-2xl overflow-hidden aspect-square">
        <Image
          src={images[active]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-contain p-10 transition-transform duration-500 ${
            zoom ? "scale-150" : "scale-100"
          }`}
        />

        {/* 3D button */}
        <button
          onClick={() => setShow3D(true)}
          className="absolute top-4 right-4 bg-[#800020] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 shadow-lg hover:bg-[#5c0016] transition-all group"
        >
          <Box className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          VIEW IN 3D
        </button>

        {/* Zoom toggle */}
        <button
          onClick={() => setZoom((z) => !z)}
          aria-label="Zoom"
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white"
        >
          <ZoomIn className="w-4 h-4 text-neutral-700" />
        </button>

        {product.isNew && (
          <span className="absolute top-4 left-4 bg-[#5c0016] text-white text-[10px] tracking-widest font-semibold px-3 py-1 rounded-md">
            NEW
          </span>
        )}
      </div>

      {show3D && (
        <Product3DViewer product={product} onClose={() => setShow3D(false)} />
      )}
    </div>
  );
}
