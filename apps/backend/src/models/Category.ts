import { Schema, model, Document } from "mongoose";

export interface CategoryDoc extends Document {
  name: string;
  slug: string;
  subcategories: {
    name: string;
  }[];
  image: {
    public_id: string;
    url: string;
  };
  description: string;
}

const CategorySchema = new Schema<CategoryDoc>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  subcategories: [
    {
      name: { type: String, required: false },
    },
  ],
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  description: { type: String, required: false },
});

export const Category = model<CategoryDoc>("Category", CategorySchema);
