import type { RaRecord } from "ra-core";
import type {
  Customer as BaseCustomer,
  Category as BaseCategory,
  Product as BaseProduct,
  Order as BaseOrder,
  Invoice as BaseInvoice,
  Review as BaseReview,
} from "@khalifa/types";

export type ThemeName = "light" | "dark";

// Re-export shared types extended with RaRecord for react-admin compatibility
export type Customer = RaRecord & BaseCustomer;
export type Category = RaRecord & BaseCategory;
export type Product = RaRecord & BaseProduct;
export type Order = RaRecord & BaseOrder;
export type Invoice = RaRecord & BaseInvoice;
export type Review = RaRecord & BaseReview;
