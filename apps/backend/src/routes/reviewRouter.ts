import { Router } from "express";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { getAuth } from "../auth.js";

const router = Router();
const isAuthenticated = (req: any, res: any, next: any) => getAuth().handler(req, res, next);

router.post("/", isAuthenticated, createReview);
router.get("/", getReviews);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

export default router;
