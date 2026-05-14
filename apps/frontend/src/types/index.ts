// Shared domain types — sourced from @khalifa/types
export type {
  BannerImage,
  Category,
  Product,
  Customer,
  Order,
  BasketItem,
  Review,
  Invoice,
} from "@khalifa/types";

// BannerImages is the old name used across components — keep as alias
export type { BannerImage as BannerImages } from "@khalifa/types";

// Frontend-only types
export interface ShopContextType {
  products: import("@khalifa/types").Product[];
  search: string;
  showSearch: boolean;
}
