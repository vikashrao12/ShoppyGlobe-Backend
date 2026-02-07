import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

export default router;
