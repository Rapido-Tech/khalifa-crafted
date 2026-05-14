// src/email/resend.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "re_123";

if (!resendApiKey) {
  console.warn(
    "RESEND_API_KEY is not set. Email functionalities will be disabled."
  );
}

export const resend = new Resend(resendApiKey);
