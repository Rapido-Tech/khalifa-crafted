import { Schema, model, Document } from "mongoose";

export interface ReviewDoc extends Document {
  date: Date;
  status: "pending" | "accepted" | "rejected";
  order_id: Schema.Types.ObjectId;
  product_id: Schema.Types.ObjectId;
  customer_id: Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<ReviewDoc>(
  {
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    order_id: { type: Schema.Types.ObjectId, ref: "Order" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

export const Review = model<ReviewDoc>("Review", ReviewSchema);
