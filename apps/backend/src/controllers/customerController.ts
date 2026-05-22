import { Request, Response } from "express";
import { Customer } from "../models/Customer.js";
import { catchAsync } from "../lib/catchAsync.js";

export const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { email, first_name, last_name, address, city, zipcode, total_spent = 0 } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { email },
    {
      $setOnInsert: { email, groups: [], has_newsletter: false },
      $set: { first_name, last_name, address, city, zipcode, last_seen: new Date(), latest_purchase: new Date(), has_ordered: true },
      $inc: { nb_orders: 1, total_spent },
    },
    { upsert: true, new: true }
  );

  res.status(200).json(customer);
});

export const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;
  const sortField = (req.query._sort as string) === "id" ? "_id" : (req.query._sort as string) || "createdAt";
  const sortOrder = req.query._order === "DESC" ? -1 : 1;

  const [customers, total] = await Promise.all([
    Customer.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Customer.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(customers);
});

export const getCustomer = catchAsync(async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ error: "Not found" });
  res.json(customer);
});

export const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});
