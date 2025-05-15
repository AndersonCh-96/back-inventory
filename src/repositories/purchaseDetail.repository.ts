import AppDataSource from "../database/db";
import { PurchaseDetail } from "../entities/purchaseDetail.entity";

export const purchaseDetailRepository = AppDataSource.getRepository(PurchaseDetail);
