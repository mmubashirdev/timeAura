"use client";

import { useEffect, useState, useCallback } from "react";
import { cartStore } from "@/lib/storage/cart";

export function useCart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cartStore.get());
    return cartStore.subscribe(setItems);
  }, []);

  const add = useCallback(
    (product, qty = 1) => cartStore.add(product, qty),
    [],
  );
  const remove = useCallback((id) => cartStore.remove(id), []);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, count };
}
