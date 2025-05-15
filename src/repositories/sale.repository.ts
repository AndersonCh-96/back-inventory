import AppDataSource from "../database/db";
import { Sale } from "../entities/sale.entity";

export const saleRepository = AppDataSource.getRepository(Sale);
