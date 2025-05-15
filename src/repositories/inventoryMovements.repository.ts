import AppDataSource from "../database/db";
import { InventoryMovement } from "../entities/inventoryMovements.entity";

export const inventoryMovementRepository =
  AppDataSource.getRepository(InventoryMovement);
