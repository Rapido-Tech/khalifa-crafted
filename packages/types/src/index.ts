// Shared domain types for Khalifa Crafted.
// No framework-specific dependencies — usable in backend, admin, and frontend.

export interface ImageAsset {
  url: string;
  publicId: string;
}

export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
  image: ImageAsset;
  description: string;
}

export interface Product {
  _id: string;
  name: string;
  slug?: string;
  /** Populated category object or bare ObjectId string */
  category: string | Category;
  price: number;
  discount?: number;
  thumbnail: ImageAsset;
  images: ImageAsset[];
  description: string;
  stock: number;
  sizes?: string[];
  colors?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BasketItem {
  product_id: string;
  quantity: number;
}

export interface Order {
  _id: string;
  reference?: string;
  date: string;
  customer_id: string;
  basket: BasketItem[];
  total_ex_taxes: number;
  delivery_fees: number;
  tax_rate: number;
  taxes: number;
  total: number;
  status: "ordered" | "delivered" | "canceled";
  returned: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  avatar?: string;
  last_seen?: string;
  has_ordered: boolean;
  latest_purchase?: string;
  has_newsletter: boolean;
  groups: string[];
  nb_orders: number;
  total_spent: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Invoice {
  _id: string;
  date: string;
  order_id: string;
  customer_id: string;
  total_ex_taxes: number;
  delivery_fees: number;
  tax_rate: number;
  taxes: number;
  total: number;
}

export interface Review {
  _id: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  order_id: string;
  product_id: string;
  customer_id: string;
  rating: number;
  comment: string;
}

export interface BannerImage {
  name: string;
  image: string;
}
