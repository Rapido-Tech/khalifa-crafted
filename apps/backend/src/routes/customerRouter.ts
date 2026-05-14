import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);

router
  .route("/:id")
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

export default router;
