import AppDataSource from "../database/db";
import { SaleDetail } from "../entities/saleDetail.entity";

export const saleDetailRepository = AppDataSource.getRepository(SaleDetail);
