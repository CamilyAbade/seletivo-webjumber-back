import express from "express";
import { ProductController} from "../controller/productController";


export const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/all-products", productController.getProducts);
productRouter.post("/post-product", productController.postProduct);
productRouter.put("/update-product", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);



