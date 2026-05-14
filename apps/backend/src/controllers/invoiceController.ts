import { Request, Response } from "express";
import { Invoice } from "../models/Invoice.js";
import { catchAsync } from "../lib/catchAsync.js";

export const createInvoice = catchAsync(async (req: Request, res: Response) => {
  const invoice = new Invoice(req.body);
  const saved = await invoice.save();
  res.status(201).json(saved);
});

export const getInvoices = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;
  const sortField = (req.query._sort as string) === "id" ? "_id" : (req.query._sort as string) || "createdAt";
  const sortOrder = req.query._order === "DESC" ? -1 : 1;

  const [invoices, total] = await Promise.all([
    Invoice.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Invoice.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(invoices);
});

export const getInvoice = catchAsync(async (req: Request, res: Response) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).json({ error: "Not found" });
  res.json(invoice);
});

export const updateInvoice = catchAsync(async (req: Request, res: Response) => {
  const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteInvoice = catchAsync(async (req: Request, res: Response) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});
