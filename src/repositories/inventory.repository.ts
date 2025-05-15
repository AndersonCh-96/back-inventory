import AppDataSource from "../database/db";
import { Inventory } from "../entities/inventory.entity";

export const inventoryRepository = AppDataSource.getRepository(Inventory);
