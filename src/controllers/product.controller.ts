import { Response, Request } from "express";
import { Inject, Service } from "typedi";
import { ProductService } from "../services/product.service";
import { productRepository } from "../repositories/product.repository";
import path from "path";
import fs from "fs";

@Service()
export class ProductController {
  @Inject()
  private productService!: ProductService;

  async getAllProduct(req: Request, resp: Response) {
    try {
      const products = await this.productService.getAllProducts();
      resp.status(200).send(products);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async getOneProduct(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const getOneProduct = await this.productService.getOneProduct(id);

      resp.status(200).send(getOneProduct);
    } catch (error: any) {
      resp.status(400).send(error);
    }
  }
  async createProduct(req: Request, resp: Response) {
    try {
      const product = req.body;
      const file = req.file;
      const saveProduct = await this.productService.createProduct(
        product,
        file
      );
      resp.status(200).send(saveProduct);
    } catch (error: any) {
      resp.status(400).json(error.message);
    }
  }

  async updateProduct(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const product = req.body;
      const file = req.file;

      const updateProduct = await this.productService.updateProduct(
        id,
        product,
        file
      );
      resp.status(200).send(updateProduct);
    } catch (error) {}
  }

  async deleteProduct(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.deleteProduct(id);

      resp.status(200).send(product);
    } catch (error: any) {
      resp.send(error.message);
    }
  }
}
