import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.DB_URI as string);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDatabase;
