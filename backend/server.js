import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.post("/products", async (req, res) => {
  const products = req.body; // Placeholder for fetching products from the database
  res.json(products);
  if (!products.name || !products.price || !products.imageUrl) {
    res.status(400).json({ message: "Missing required product fields" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
