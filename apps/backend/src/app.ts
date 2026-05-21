import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { getAuth } from "./auth.js";
import { errorMiddleware } from "./lib/errorMiddleware.js";

dotenv.config({ path: "./src/config/config.env" });
const app = express();

const BASE_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
];
const extraOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: [...BASE_ORIGINS, ...extraOrigins],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
  })
);

// Better Auth routes setup
// The `toNodeHandler(auth)` function integrates Better Auth's routes into Express.
// for any path starting with "/api/auth/" will be handled by Better Auth.
app.all("/api/auth/*splat", (req, res) => toNodeHandler(getAuth())(req, res));

// Routers
import productRouter from "./routes/productRouter.js";
import customerRouter from "./routes/customerRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import invoiceRouter from "./routes/invoiceRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

// Middleware to parse JSON request bodies
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Basic route for testing server
app.get("/", (req, res) => {
  res.send("Better Auth Backend is running!");
});

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(errorMiddleware);

export default app;
