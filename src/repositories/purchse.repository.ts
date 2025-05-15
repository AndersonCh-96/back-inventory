import AppDataSource from "../database/db";
import { Purchase } from "../entities/purchase.entity";

export const purchaseRepository = AppDataSource.getRepository(Purchase);
