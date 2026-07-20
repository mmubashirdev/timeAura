"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPKR } from "@/lib/format";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useCurrentUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, view = "grid" }) {
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const { data: userResp } = useCurrentUser();
  const user = userResp?.data?.user;
  const router = useRouter();
  const wished = has(product.id);

  const displayImage = product.thumbnailImage || 
    (product.images?.length > 0 ? product.images.find(img => typeof img === 'string' && img.trim() !== '') : null) || 
    product.image || 
    "/images/placeholder.jpg";

  const handleWish = (e) => {
    e.preventDefault();
    const nowIn = toggle(product.id);
    toast.success(nowIn ? "Added to wishlist" : "Removed from wishlist");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please create an account to add items to your cart");
      router.push("/register");
      return;
    }
    add(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  if (view === "list") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex gap-4 bg-white border border-neutral-100 rounded-xl p-3 hover:shadow-md transition-shadow"
      >
        <div className="relative w-32 h-32 shrink-0 bg-neutral-50 rounded-lg overflow-hidden">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="128px"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-neutral-500 font-semibold">
              {product.categoryLabel}
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 mt-1">
              {product.name}
            </h3>
            <RatingRow rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="flex items-center justify-between">
            <PriceRow product={product} />
            <div className="flex items-center gap-2">
              <button
                onClick={handleWish}
                aria-label="Toggle wishlist"
                className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-[#800020]"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${wished ? "text-[#800020] fill-[#800020]" : ""}`}
                />
              </button>
              <button
                onClick={handleAdd}
                aria-label="Add to cart"
                className="w-8 h-8 rounded-lg bg-[#800020] text-white hover:bg-[#5c0016] flex items-center justify-center"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow"
    >
      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[#5c0016] text-white text-[10px] tracking-widest font-semibold px-2.5 py-1 rounded-md">
          NEW
        </span>
      )}
      {product.isSale && !product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[#5c0016] text-white text-[10px] tracking-widest font-semibold px-2.5 py-1 rounded-md">
          SALE
        </span>
      )}

      <button
        onClick={handleWish}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${wished ? "text-[#800020] fill-[#800020]" : "text-neutral-500"}`}
        />
      </button>

      <div className="relative aspect-square bg-neutral-50">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="text-[10px] tracking-[0.2em] text-neutral-500 font-semibold">
          {product.categoryLabel}
        </div>
        <h3 className="text-sm font-semibold text-neutral-900">
          {product.name}
        </h3>
        <RatingRow rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-1">
          <PriceRow product={product} />
          <button
            onClick={handleAdd}
            aria-label="Add to cart"
            className="w-8 h-8 rounded-lg bg-[#800020] text-white hover:bg-[#5c0016] flex items-center justify-center"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
}

function RatingRow({ rating, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < Math.round(rating) ? "text-[#C9A14A] fill-[#C9A14A]" : "text-neutral-300"}`}
          />
        ))}
      </span>
      <span className="text-[11px] text-neutral-500">({count})</span>
    </div>
  );
}

function PriceRow({ product }) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`text-sm font-bold ${product.compareAtPrice ? "text-[#800020]" : "text-neutral-900"}`}
      >
        {formatPKR(product.price)}
      </span>
      {product.compareAtPrice && (
        <span className="text-xs text-neutral-400 line-through">
          {formatPKR(product.compareAtPrice)}
        </span>
      )}
    </div>
  );
}
