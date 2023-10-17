import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 50,
      minLength: 4,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
