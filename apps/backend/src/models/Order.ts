import { Schema, model, Document } from "mongoose";

export interface BasketItem {
  product_id: Schema.Types.ObjectId;
  quantity: number;
}

export interface OrderDoc extends Document {
  reference: string;
  date: Date;
  customer_id: Schema.Types.ObjectId;
  basket: BasketItem[];
  total_ex_taxes: number;
  delivery_fees: number;
  tax_rate: number;
  taxes: number;
  total: number;
  status: "ordered" | "delivered" | "canceled";
  returned: boolean;
}

const BasketItemSchema = new Schema<BasketItem>({
  product_id: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const OrderSchema = new Schema<OrderDoc>(
  {
    reference: String,
    date: { type: Date, default: Date.now },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    basket: [BasketItemSchema],
    total_ex_taxes: Number,
    delivery_fees: Number,
    tax_rate: Number,
    taxes: Number,
    total: Number,
    status: { type: String, enum: ["ordered", "delivered", "canceled"] },
    returned: Boolean,
  },
  { timestamps: true }
);

OrderSchema.index({ customer_id: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ reference: 1 }, { unique: true, sparse: true });

export const Order = model<OrderDoc>("Order", OrderSchema);
