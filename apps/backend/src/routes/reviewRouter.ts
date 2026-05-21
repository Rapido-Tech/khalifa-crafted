import { Router, Request, Response, NextFunction } from "express";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { getAuth } from "../auth.js";
import { catchAsync } from "../lib/catchAsync.js";

const router = Router();

const requireAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const session = await getAuth().api.getSession({
    headers: new Headers(req.headers as Record<string, string>),
  });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
});

router.post("/", requireAuth, createReview);
router.get("/", getReviews);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

export default router;
