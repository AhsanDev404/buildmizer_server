import express from "express";
import upload from "../middlewares/uploadMulter.js";
import {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { authorizeRole, isAuthenticate } from "../middlewares/auth.js";

const productRouter = express.Router();

// Create a new product
productRouter
  .route("/products")
  .post(
    isAuthenticate,
    authorizeRole("admin"),
    upload.single("image"),
    createProduct
  );

// Update a product by ID
productRouter
  .route("/products/:id")
  .put(
    isAuthenticate,
    authorizeRole("admin"),
    upload.single("image"),
    updateProduct
  );

// Get a product by ID
productRouter.route("/products/:id").get(getProduct);

// Get all products
productRouter.route("/products").get(getProducts);

// Delete a product by ID
productRouter
  .route("/products/:id")
  .delete(isAuthenticate, authorizeRole("admin"), deleteProduct);

export default productRouter;
