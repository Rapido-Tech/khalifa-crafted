import { betterAuth } from "better-auth";
import dotenv from "dotenv";
import { resend } from "./email/resend.js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

dotenv.config({ path: "./src/config/config.env" });

const from = process.env.EMAIL_FROM ?? "noreply@khalifacrafted.store";

let _auth: ReturnType<typeof betterAuth> | null = null;

export const getAuth = (): ReturnType<typeof betterAuth> => {
  if (_auth) return _auth;

  const client = mongoose.connection.getClient();
  if (!client) throw new Error("MongoDB not connected — call connectDatabase() before getAuth()");

  _auth = betterAuth({
    appName: "Khalifa Crafted",
    database: mongodbAdapter(client.db() as any),
    emailVerification: {
      enabled: true,
      async sendVerificationEmail({ user, url }) {
        if (!user.email) return;
        try {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Verify your email address",
            html: `<p>Hello ${user.name || user.email},</p><p>Please verify your email address by clicking on the link below:</p><a href="${url}">Verify your email address</a><p>If you did not request this, please ignore this email.</p>`,
          });
        } catch (error) {
          console.error(`Failed to send verification email to ${user.email}:`, error);
        }
      },
    },
    emailAndPassword: {
      enabled: true,
      async sendResetPassword({ user, url }) {
        if (!user.email) return;
        try {
          await resend.emails.send({
            from,
            to: user.email,
            subject: "Reset your password",
            html: `<p>Your reset password link is ${url}</p>`,
          });
        } catch (error) {
          console.error(`Failed to send password reset email to ${user.email}:`, error);
        }
      },
    },
    trustedOrigins: [
      "exp://",
      "http://localhost:5173",
      "http://localhost:3000",
      ...(process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
        : []),
    ],
  });

  return _auth!;
};
