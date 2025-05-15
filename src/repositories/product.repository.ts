import AppDataSource from "../database/db";
import { Product } from "../entities/product.entity";

export const productRepository = AppDataSource.getRepository(Product);
