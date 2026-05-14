import { Request, Response } from "express";
import { Category } from "../models/Category.js";
import { deleteFromCloudinary, handleThumbnailUpload } from "../lib/utils.js";
import { catchAsync } from "../lib/catchAsync.js";
import slugifyModule from "slugify";

const slugify = slugifyModule.default;

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  let cloudinaryPublicId: string | undefined;

  try {
    const thumbnailFile = req.files?.categoryImg;
    let categoryImage;

    if (thumbnailFile) {
      categoryImage = await handleThumbnailUpload(thumbnailFile);
      cloudinaryPublicId = categoryImage?.public_id;
    }

    const slug = slugify(req.body.name, { lower: true });
    const category = new Category({ ...req.body, slug, image: categoryImage });
    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    if (cloudinaryPublicId) await deleteFromCloudinary(cloudinaryPublicId);
    throw error;
  }
});

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;

  const [categories, total] = await Promise.all([
    Category.find().skip(skip).limit(limit),
    Category.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(categories);
});

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json(category);
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});
