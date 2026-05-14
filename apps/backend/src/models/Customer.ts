import { Schema, model, Document } from "mongoose";

export interface CustomerDoc extends Document {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  avatar: string;
  last_seen: Date;
  has_ordered: boolean;
  latest_purchase?: Date;
  has_newsletter: boolean;
  groups: string[];
  nb_orders: number;
  total_spent: number;
}

const CustomerSchema = new Schema<CustomerDoc>(
  {
    first_name: String,
    last_name: String,
    email: String,
    address: String,
    zipcode: String,
    city: String,
    avatar: String,
    last_seen: { type: Date, default: Date.now },
    has_ordered: Boolean,
    latest_purchase: Date,
    has_newsletter: Boolean,
    groups: [String],
    nb_orders: Number,
    total_spent: Number,
  },
  { timestamps: true }
);

CustomerSchema.index({ email: 1 }, { unique: true, sparse: true });
CustomerSchema.index({ last_seen: -1 });
CustomerSchema.index({ has_ordered: 1 });

export const Customer = model<CustomerDoc>("Customer", CustomerSchema);
