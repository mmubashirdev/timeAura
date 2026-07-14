"use client";

import { useEffect, useState, useCallback } from "react";
import { wishlistStore } from "@/lib/storage/wishlist";

export function useWishlist() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(wishlistStore.get());
    return wishlistStore.subscribe(setIds);
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => wishlistStore.toggle(id), []);
  return { ids, has, toggle };
}
