import { Request, Response } from "express";
import { Order } from "../models/Order.js";
import { catchAsync } from "../lib/catchAsync.js";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = new Order(req.body);
  const saved = await order.save();
  res.status(201).json(saved);
});

export const getOrders = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;
  const sortField = (req.query._sort as string) === "id" ? "_id" : (req.query._sort as string) || "createdAt";
  const sortOrder = req.query._order === "DESC" ? -1 : 1;

  const [orders, total] = await Promise.all([
    Order.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Order.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(orders);
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
});

export const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});
