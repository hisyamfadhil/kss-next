"use client";

import { getCartProductCount } from "@/app/lib/cartService";

export default function CartBadge() {
  const count = getCartProductCount();

  if (count <= 0) return null;

  return <span className="badge">{count}</span>;
}
