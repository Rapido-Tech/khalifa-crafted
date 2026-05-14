import { Schema, model, Document } from "mongoose";

export interface Image {
  publicId: string;
  url: string;
}

export interface ProductDoc extends Document {
  category: Schema.Types.ObjectId;
  name: string;
  price: number;
  thumbnail: { url: string; publicId: string };
  images: { url: string; publicId: string }[];
  description: string;
  stock: number;
}

const ProductSchema = new Schema<ProductDoc>(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    thumbnail: { url: String, publicId: String },
    images: [{ url: String, publicId: String }],
    description: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ name: "text", description: "text" });

export const Product = model<ProductDoc>("Product", ProductSchema);
