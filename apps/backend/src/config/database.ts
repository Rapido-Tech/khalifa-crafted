import dns from "dns";
import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV !== "production") {
    // This dev machine's local DNS stub (127.0.0.1) intermittently refuses
    // the mongodb+srv SRV lookup even though it resolves fine via the OS
    // resolver directly. Point Node's resolver at a public DNS server so
    // Atlas connections don't randomly fail on local dev.
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
  const conn = await mongoose.connect(process.env.DB_URI as string);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDatabase;
