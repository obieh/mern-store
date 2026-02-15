import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/product", upload.none(), async (req, res) => {
  const product = req.body; // Placeholder for fetching products from the database

  if (!product || !product.name || !product.price || !product.imageUrl) {
    return res.status(400).json({ message: "Missing required product fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error saving product:", error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
