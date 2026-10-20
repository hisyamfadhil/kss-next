export interface CartItem {
  id: string;                // unique id (UUID)
  user_id: number;
  product_id: number;
  product_type: "digital" | "physical";
  product_title: string;
  listing_type: string;
  slug: string;
  sku: string;
  image: string;
  quantity: number;
  vat_rate:  number;
  unit_price: number;
  total_price: number;
  discount_rate?: number;
  currency?: string;
  vat?: number;
  is_stock_available?: boolean;
  options?: string[];        // untuk variasi (warna, ukuran)
}

export interface CartTotals {
  subtotal: number;
  vat: number;
  shipping_cost: number;
  total: number;
  currency: string;
}
