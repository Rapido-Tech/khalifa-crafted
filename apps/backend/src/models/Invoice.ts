import { Schema, model, Document } from "mongoose";

export interface InvoiceDoc extends Document {
  date: Date;
  order_id: Schema.Types.ObjectId;
  customer_id: Schema.Types.ObjectId;
  total_ex_taxes: number;
  delivery_fees: number;
  tax_rate: number;
  taxes: number;
  total: number;
}

const InvoiceSchema = new Schema<InvoiceDoc>({
  date: { type: Date, default: Date.now },
  order_id: { type: Schema.Types.ObjectId, ref: "Order" },
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
  total_ex_taxes: Number,
  delivery_fees: Number,
  tax_rate: Number,
  taxes: Number,
  total: Number,
});

export const Invoice = model<InvoiceDoc>("Invoice", InvoiceSchema);
