import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    res.status(400).json({ error: `Invalid ${err.path}: ${err.value}` });
    return;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? "field";
    res.status(400).json({ error: `Duplicate value for ${field}` });
    return;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({ error: messages.join(", ") });
    return;
  }

  const status: number = err.statusCode ?? err.status ?? 500;
  const message: string = err.message ?? "Internal server error";
  res.status(status).json({ error: message });
};
