import { CartItem, CartTotals } from "./types";
import { v4 as uuidv4 } from "uuid";

const CART_KEY = "kss_cart_items";

/** Ambil cart dari localStorage */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  
  return data ? JSON.parse(data) : [];
}

/** Simpan cart ke localStorage */
function saveCart(cart: CartItem[]) {
  
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

/** Tambah produk ke cart */
export function addToCart(product: any, quantity = 1, image: string): CartItem[] {
  const cart = getCart();
  const existing = cart.find(
    (item) =>
      item.product_id === product.id &&
      item.product_title === product.title
  );

  if (existing) {
    existing.quantity += quantity;
    existing.total_price = existing.unit_price * existing.quantity;
  } else {
    const newItem: CartItem = {
      id: uuidv4(),
      product_id: product.id,
      user_id: product.user_id,
      listing_type: product.listing_type,
      product_type: product.product_type || "physical",
      product_title: product.title,
      slug: product.slug,
      sku: product.sku,
      image: image,
      quantity,
      unit_price: product.price,
      vat_rate: product.vat_rate,
      total_price: product.price * quantity,
      currency: product.currency || "USD",
      discount_rate: product.discount || 0,
      is_stock_available: true,
      options: product.options || [],
    };
    cart.push(newItem);
  }

  saveCart(cart);
  return cart;
}

/** Hapus item dari cart */
export function removeFromCart(itemId: string) {
  const cart = getCart().filter((item) => item.id !== itemId);
  saveCart(cart);
  return cart;
}

/** Ubah jumlah item */
export function updateQuantity(itemId: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity < 1 ? 1 : quantity;
    item.total_price = item.unit_price * item.quantity;
  }
  saveCart(cart);
  return cart;
}

/** Hitung total */
export function calculateTotals(cart: CartItem[]): CartTotals {
  let subtotal = 0;
  let vat = 0;
  const shipping_cost = 0;

  cart.forEach((item) => {
    subtotal += item.total_price;
    vat += (item.vat || 0);
  });

  const total = subtotal + vat + shipping_cost;
  return {
    subtotal,
    vat,
    shipping_cost,
    total,
    currency: cart[0]?.currency || "USD",
  };
}

/** Hapus semua cart */
export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY);
  }
}

export function getCartProductCount(): number {
  if (typeof window === "undefined") return 0; // pastikan tidak dijalankan di server

  try {
    const cartData = localStorage.getItem(CART_KEY);
    if (!cartData) return 0;

    const cart = JSON.parse(cartData);
    return Array.isArray(cart) ? cart.length : 0;
  } catch (error) {
    console.error("Error reading cart:", error);
    return 0;
  }
}