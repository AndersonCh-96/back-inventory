import { Service } from "typedi";
import { productRepository } from "../repositories/product.repository";
import { error } from "console";
import path from "path";
import fs from "fs";
import { cloudinary } from "../config/cloudinary";

@Service()
export class ProductService {
  async getAllProducts() {
    return await productRepository.find({ relations: ["inventory"] });
  }

  async createProduct(product: any, file: any) {
    const findProduct = await productRepository.findOne({
      where: { code: product.code },
    });

    if (findProduct) {
      throw new Error("El producto con ese código ya éxiste");
    }

    const productData = {
      ...product,
      image: file ? file.path : null,
    };

    return await productRepository.save(productData);

    // const productData = {
    //   ...product,
    //   image: file ? `/uploads/${file.filename}` : null,
    // };
    // return await productRepository.save(productData);
  }

  async getOneProduct(id: any) {
    const findProduct = await productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new Error("Producto no encontrado");
    }

    return findProduct;
  }
  async updateProduct(id: string, product: any, file: any) {
    const findProduct = await productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new Error("El producto no existe");
    }

    if (file && findProduct.image) {
      const publidId = this.getPublicIdFromUrl(findProduct.image);
      await cloudinary.uploader.destroy(publidId);
      // const imagePath = path.resolve(
      //   "public",
      //   "uploads",
      //   path.basename(findProduct.image)
      // );

      // if (fs.existsSync(imagePath)) {
      //   fs.unlinkSync(imagePath);
      // }
    }

    if (file) {
      // product.image = `/uploads/${file.filename}`;
      product.image = file.path;
    } else {
      product.image = findProduct.image;
    }

    await productRepository.update(findProduct.id, product);

    const updatedProduct = await productRepository.findOne({ where: { id } });
    return updatedProduct;
  }

  async deleteProduct(id: any) {
    const findProduct = await productRepository.findOne({ where: { id: id } });
    if (!findProduct) {
      throw new Error("Producto no encontrado");
    }

    await productRepository.softDelete(findProduct.id);
    return findProduct;
  }

  getPublicIdFromUrl(url: any) {
    const parts = url.split("/");
    const folderAndFile = parts.slice(-2).join("/");
    return folderAndFile.split(".")[0];
  }
}
