import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// POST cart  add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // product exists?
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // already in cart?
    const existingItem = await Cart.findOne({
      user: req.user,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const cartItem = await Cart.create({
      user: req.user,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT cart/:id  update quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE cart/:id remove item
export const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
