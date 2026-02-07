import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cart", protect, addToCart);
router.put("/cart/:id", protect, updateCartItem);
router.delete("/cart/:id", protect, removeCartItem);

export default router;
