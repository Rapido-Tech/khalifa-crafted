import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
