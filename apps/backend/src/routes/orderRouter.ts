import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default router;
