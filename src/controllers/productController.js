import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { title, price , category } = req.body;
  if (!req.file) {
    return next(new ErrorHandler(400, "Please upload an image."));
  }
  const imageUrl = req.file.path;

  const product = await Product.create({ title, price, imageUrl,category });

  if (!product) {
    return next(new ErrorHandler(401, "Product not created"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id; // Assuming the product ID is passed in the request parameters

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // Delete the product from the database
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id; // Assuming the product ID is passed in the request parameters

  const { title, price,category } = req.body;
  let imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // Update product fields if provided in the request
  if (title) {
    product.title = title;
  }
  if (price) {
    product.price = price;
  }
  if (imageUrl) {
    product.imageUrl = imageUrl;
  }
  if (category) {
    product.category = category;
  }

  // Save the updated product to the database
  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});


export const getProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id; // Assuming the product ID is passed in the request parameters

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


export const getProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

