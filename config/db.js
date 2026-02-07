import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB connection failed ", error.message);
  
  }
};

export default connectDB;
