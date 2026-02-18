import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    let { name, price, image, countInStock,description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    if (!description) {
      description = await generateDescription(name);
    }


    

    const product = new Product({
      name,
      price,
      image,
      countInStock,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;