import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";



dotenv.config();
  connectDB();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", productRoutes);
// auth routes
app.use("/api", authRoutes);
// cart routes
app.use("/api", cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ShoppyGlobe API is running ");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
