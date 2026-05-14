import { Resend } from "resend";

const RESEND_API_KEY = import.meta.env.VITE_DB_URI;

export const resend = new Resend(RESEND_API_KEY || "re_123");
