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
  const update = useCallback((id, qty) => cartStore.update(id, qty), []);
  const increment = useCallback((id) => cartStore.increment(id), []);
  const decrement = useCallback((id) => cartStore.decrement(id), []);
  const clear = useCallback(() => cartStore.clear(), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return {
    items,
    count,
    subtotal,
    add,
    remove,
    update,
    increment,
    decrement,
    clear,
  };
}
