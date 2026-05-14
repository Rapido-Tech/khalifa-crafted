import { Request, Response } from "express";
import { Product } from "../models/Product.js";
import { deleteFromCloudinary, handleThumbnailUpload } from "../lib/utils.js";
import { catchAsync } from "../lib/catchAsync.js";
import slugifyModule from "slugify";

const slugify = slugifyModule.default;

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const cloudinaryPublicIds: string[] = [];

  try {
    const thumbnailFile = req.files?.thumbnail;
    const imageFiles = req.files?.["images[]"];
    const normalizedImageFiles = imageFiles
      ? Array.isArray(imageFiles)
        ? imageFiles
        : [imageFiles]
      : [];

    // Upload thumbnail and gallery images in parallel
    const [productImage, ...imageResults] = await Promise.all([
      thumbnailFile ? handleThumbnailUpload(thumbnailFile) : Promise.resolve(undefined),
      ...normalizedImageFiles.map((image) => handleThumbnailUpload(image)),
    ]);

    if (productImage?.public_id) cloudinaryPublicIds.push(productImage.public_id);
    const imageUrls: { public_id: string; url: string }[] = [];
    for (const result of imageResults) {
      if (result) {
        imageUrls.push(result);
        cloudinaryPublicIds.push(result.public_id);
      }
    }

    const slug = slugify(req.body.name, { lower: true });
    const product = new Product({
      ...req.body,
      slug,
      thumbnail: productImage,
      images: imageUrls,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    // Rollback: delete all uploaded files before propagating
    await Promise.allSettled(cloudinaryPublicIds.map((id) => deleteFromCloudinary(id)));
    throw error;
  }
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query._page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query._limit as string) || 20));
  const skip = (page - 1) * limit;
  const sortField = (req.query._sort as string) === "id" ? "_id" : (req.query._sort as string) || "createdAt";
  const sortOrder = req.query._order === "DESC" ? -1 : 1;

  const [products, total] = await Promise.all([
    Product.find()
      .populate({ path: "category", select: "name slug _id subcategories" })
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(),
  ]);

  res.setHeader("X-Total-Count", total);
  res.json(products);
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category",
    select: "name slug _id subcategories",
  });

  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    const ids = [product.thumbnail?.publicId, ...product.images.map((i) => i.publicId)].filter(Boolean);
    await Promise.allSettled(ids.map((id) => deleteFromCloudinary(id!)));
  }
  res.json({ id: req.params.id });
});
