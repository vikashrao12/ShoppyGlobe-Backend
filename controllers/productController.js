import Product from "../models/Product.js";



// add product  create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: "All fields required" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      stock
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET products  get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET products/:id  get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Invalid product ID" });
  }
};
