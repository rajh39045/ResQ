import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "MONGODB_URI:",
      process.env.MONGODB_URI
    );

    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed:",
      error.message
    );
    process.exit(1);
  }
};

export default connectDB;