import { MongoClient } from "mongodb";
const MONGODB_URI = import.meta.env.VITE_DB_URI;

const client = new MongoClient(MONGODB_URI);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

export { client };
