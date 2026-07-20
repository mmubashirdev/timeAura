"use client";

import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  GitCompare,
  Minus,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/format";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useCurrentUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const CASE_COLORS = [
  { id: "rose", name: "Rose Gold", hex: "#c9a07a" },
  { id: "silver", name: "Silver", hex: "#c8c8c8" },
];

const STRAP_COLORS = [
  { id: "brown", name: "Brown", hex: "#5c3a1e" },
  { id: "black", name: "Black", hex: "#1a1a1a" },
];

export default function ProductInfo({ product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  
  const { data: userResp } = useCurrentUser();
  const user = userResp?.data?.user;
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [caseColor, setCaseColor] = useState(CASE_COLORS[0]);
  const [strapColor, setStrapColor] = useState(STRAP_COLORS[0]);

  const handleAdd = () => {
    if (!user) {
      toast.error("Please create an account to add items to your cart");
      router.push("/register");
      return;
    }
    add(product, qty);
    toast.success(`${product.name} × ${qty} added to cart`);
  };

  const handleBuyNow = () => {
    const text = `Hi, I would like to buy ${qty}x ${product.name} (${caseColor.name} Case, ${strapColor.name} Strap). Price: ${formatPKR(product.price * qty)}.`;
    window.open(`https://wa.me/923127721817?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleWish = () => {
    const nowIn = toggle(product.id);
    toast.success(nowIn ? "Added to wishlist" : "Removed from wishlist");
  };

  const rating = product.rating ?? 4.8;
  const reviewCount = product.reviewCount ?? 24;

  return (
    <div className="space-y-5">
      {(product.isNew || product.isSale) && (
        <span className="inline-block text-[10px] font-semibold tracking-widest px-3 py-1 border border-[#800020] text-[#800020] rounded-md">
          {product.isNew ? "NEW" : "BEST SELLER"}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight">
          {product.name}
        </h1>
        <span className="text-xs text-neutral-500 mt-2 whitespace-nowrap">
          SKU: {product.sku || `TA-${String(product.id).padStart(4, "0")}`}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating)
                  ? "text-[#C9A14A] fill-[#C9A14A]"
                  : "text-neutral-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-neutral-800">{rating}</span>
        <span className="text-sm text-neutral-500">
          ({reviewCount} reviews)
        </span>
      </div>

      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-semibold text-[#800020]">
            {formatPKR(product.price)}
          </p>
          {product.compareAtPrice && (
            <p className="text-lg text-neutral-400 line-through">
              {formatPKR(product.compareAtPrice)}
            </p>
          )}
        </div>
        <span className="flex items-center gap-2 text-sm text-neutral-700">
          In Stock
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </span>
      </div>

      <p className="text-neutral-600 leading-relaxed">
        A timeless blend of classic design and modern precision. The{" "}
        {product.name} is crafted for those who appreciate sophistication in
        every detail.
      </p>

      <VariantPicker
        label="Case Color"
        options={CASE_COLORS}
        selected={caseColor}
        onSelect={setCaseColor}
      />

      <VariantPicker
        label="Strap Color"
        options={STRAP_COLORS}
        selected={strapColor}
        onSelect={setStrapColor}
      />

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-neutral-800 mb-2">Quantity</p>
        <div className="inline-flex items-center border border-neutral-300 rounded-xl bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-neutral-50 rounded-l-xl"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center bg-transparent outline-none text-sm font-medium"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="p-3 hover:bg-neutral-50 rounded-r-xl"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button onClick={handleAdd} size="lg" className="h-12 text-sm">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </Button>
        <Button
          onClick={handleBuyNow}
          variant="outline"
          size="lg"
          className="h-12 text-sm border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
        >
          Buy Now on WhatsApp
        </Button>
      </div>

      <div className="flex items-center gap-6 pt-2 text-sm">
        <button
          onClick={handleWish}
          className={`flex items-center gap-2 transition-colors ${
            wished ? "text-[#800020]" : "text-neutral-600 hover:text-[#800020]"
          }`}
        >
          <Heart className={`w-4 h-4 ${wished ? "fill-[#800020]" : ""}`} />
          {wished ? "Wishlisted" : "Add to Wishlist"}
        </button>
        <button className="flex items-center gap-2 text-neutral-600 hover:text-[#800020] transition-colors">
          <GitCompare className="w-4 h-4" /> Compare
        </button>
      </div>
    </div>
  );
}

function VariantPicker({ label, options, selected, onSelect }) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-800 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt)}
            title={opt.name}
            className={`w-9 h-9 rounded-full border-2 transition-all ${
              selected?.id === opt.id
                ? "border-[#800020] ring-2 ring-[#800020]/20"
                : "border-neutral-300 hover:border-neutral-500"
            }`}
            style={{ backgroundColor: opt.hex }}
          />
        ))}
      </div>
    </div>
  );
}
