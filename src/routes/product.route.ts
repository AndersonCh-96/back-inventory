import express from "express";
import Container from "typedi";
import { ProductController } from "../controllers/product.controller";
import upload from "../config/cloudinaryStore";
// import upload from "../config/multer";

export const product_route = express.Router();

const productController = Container.get(ProductController);
product_route.get("/", productController.getAllProduct.bind(productController));
product_route.get(
  "/:id",
  productController.getOneProduct.bind(productController)
);
product_route.post(
  "/create",
  upload.single("image"),
  productController.createProduct.bind(productController)
);
product_route.put(
  "/:id",
  upload.single("image"),
  productController.updateProduct.bind(productController)
);
product_route.delete(
  "/:id",
  productController.deleteProduct.bind(productController)
);
