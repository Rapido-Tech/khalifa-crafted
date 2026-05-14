import { Request, Response } from "express";
import { Review } from "../models/Review.js";
import { catchAsync } from "../lib/catchAsync.js";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = new Review(req.body);
  const saved = await review.save();
  res.status(201).json(saved);
});

export const getReviews = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;
  const sortField = (req.query._sort as string) === "id" ? "_id" : (req.query._sort as string) || "createdAt";
  const sortOrder = req.query._order === "DESC" ? -1 : 1;

  const [reviews, total] = await Promise.all([
    Review.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Review.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(reviews);
});

export const getReview = catchAsync(async (req: Request, res: Response) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Not found" });
  res.json(review);
});

export const updateReview = catchAsync(async (req: Request, res: Response) => {
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});
