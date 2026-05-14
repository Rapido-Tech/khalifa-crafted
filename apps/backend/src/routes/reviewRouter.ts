import { Router } from "express";
import {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { auth } from "../auth.js";

const router = Router();
const isAuthenticated = auth.handler;

router.post("/", isAuthenticated, createReview);
router.get("/", getReviews);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

export default router;
