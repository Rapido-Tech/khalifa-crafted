import { Router } from "express";
import {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.route("/:id").get(getInvoice).put(updateInvoice).delete(deleteInvoice);

export default router;
