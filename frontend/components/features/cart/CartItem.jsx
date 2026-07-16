"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { formatPKR } from "@/lib/format";
import { useWishlist } from "@/hooks/useWishlist";

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onQtyChange,
  onRemove,
  isLast = false,
}) {
  const { has, toggle } = useWishlist();
  const wished = has(item.id);

  const handleWish = () => {
    const nowIn = toggle(item.id);
    toast.success(nowIn ? "Added to wishlist" : "Removed from wishlist");
  };

  const handleRemove = () => {
    onRemove();
    toast.success(`${item.name} removed from cart`);
  };

  // Derived fields (safe fallbacks if enrichment missed)
  const brandLabel = item.categoryLabel || item.brand || "";
  const color = item.color || (item.colors && item.colors[0]) || "Classic";
  const material = item.material || item.strap || "";
  const compareAt = item.compareAtPrice;
  const discountPct = compareAt
    ? Math.round(((compareAt - item.price) / compareAt) * 100)
    : 0;

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 py-5 ${
        !isLast ? "border-b border-neutral-100" : ""
      }`}
    >
      {/* Image */}
      <Link
        href={`/products/${item.slug}`}
        className="relative w-full sm:w-32 md:w-36 aspect-square shrink-0 bg-neutral-50 rounded-xl overflow-hidden group"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 100vw, 144px"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-4 md:items-center">
        {/* Name + meta */}
        <div className="min-w-0">
          <Link
            href={`/products/${item.slug}`}
            className="font-semibold text-neutral-900 hover:text-[#800020] transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          {brandLabel && (
            <div className="text-xs text-neutral-500 mt-0.5 capitalize">
              {brandLabel}
            </div>
          )}
          <div className="text-xs text-neutral-600 mt-2 space-y-0.5">
            <div>
              <span className="text-neutral-500">Color:</span>{" "}
              <span className="font-medium text-neutral-800">{color}</span>
            </div>
            {material && (
              <div>
                <span className="text-neutral-500">Material:</span>{" "}
                <span className="font-medium text-neutral-800">{material}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-neutral-600">In Stock</span>
          </div>
        </div>

        {/* Price */}
        <div className="md:text-right md:min-w-[100px]">
          <div className="text-sm md:text-base font-bold text-[#800020]">
            {formatPKR(item.price)}
          </div>
          {compareAt && (
            <div className="flex items-center gap-1.5 md:justify-end mt-0.5">
              <span className="text-xs text-neutral-400 line-through">
                {formatPKR(compareAt)}
              </span>
              <span className="text-[10px] font-semibold text-[#C9A14A] bg-[#C9A14A]/10 border border-[#C9A14A]/30 px-1.5 py-0.5 rounded">
                -{discountPct}%
              </span>
            </div>
          )}
        </div>

        {/* Qty selector */}
        <QuantitySelector
          qty={item.qty}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onChange={onQtyChange}
        />

        {/* Actions */}
        <div className="flex md:flex-col items-center gap-2 md:gap-2">
          <IconAction
            active={wished}
            onClick={handleWish}
            ariaLabel={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${wished ? "fill-[#800020] text-[#800020]" : ""}`}
            />
          </IconAction>
          <IconAction onClick={handleRemove} ariaLabel="Remove from cart">
            <Trash2 className="w-4 h-4" />
          </IconAction>
        </div>
      </div>
    </div>
  );
}

function QuantitySelector({ qty, onIncrement, onDecrement, onChange }) {
  return (
    <div className="inline-flex items-center border border-neutral-200 rounded-xl bg-white h-10">
      <button
        onClick={onDecrement}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
        className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-[#800020] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <input
        value={qty}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Quantity"
        className="w-10 h-full text-center bg-transparent outline-none text-sm font-semibold text-neutral-900"
      />
      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="w-10 h-full flex items-center justify-center text-neutral-600 hover:text-[#800020] transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function IconAction({ children, onClick, ariaLabel, active = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
        active
          ? "border-[#800020] bg-[#800020]/5 text-[#800020]"
          : "border-neutral-200 text-neutral-500 hover:border-[#800020] hover:text-[#800020]"
      }`}
    >
      {children}
    </motion.button>
  );
}
