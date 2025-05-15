import { Service } from "typedi";
import { InventoryMapp } from "../mapper/inventory.mapper";
import AppDataSource from "../database/db";
import { Inventory } from "../entities/inventory.entity";
import { inventoryRepository } from "../repositories/inventory.repository";
import { InventoryMovement, Type } from "../entities/inventoryMovements.entity";

@Service()
export default class InventoryService {
  private inventoryMapp!: InventoryMapp;
  private inventoryRepositorySave = AppDataSource.getRepository(Inventory);

  async getAllInventory() {
    return await this.inventoryRepositorySave.find({ relations: ["product"] });
  }

  async createAdjustment(data: any) {
    return await AppDataSource.transaction(async (manager) => {
      const inventory = await manager.findOne(Inventory, {
        where: { product: { id: data.product } },
        relations: ["product"],
      });

      if (!inventory) {
        throw new Error("Producto no encontrado");
      }

      const difference = data.newStock - inventory.stock;

      if (difference === 0) {
        return inventory;
      }

      const movement = manager.create(InventoryMovement, {
        product: { id: data.product },
        quantity: Math.abs(difference),
        type: Type.Adjustment,
        note: data.note,
      });

      inventory.stock = data.newStock;

      await manager.save(Inventory, inventory);
      await manager.save(InventoryMovement, movement);

      return inventory;
    });
  }

  // async registerPurchase(purchase: any) {
  //   const { purchaseDetails } = purchase;

  //   const newInventory: Inventory[] = [];

  //   for (const detail of purchaseDetails) {
  //     const existProductInventory = await this.inventoryRepositorySave.findOne({
  //       where: { product: { id: detail.product } },
  //     });

  //     if (existProductInventory) {
  //       existProductInventory.stock += parseInt(detail.quantity);
  //       await this.inventoryRepositorySave.save(existProductInventory);
  //     } else {
  //       const newInventoryItem = this.inventoryRepositorySave.create({
  //         stock: parseInt(detail.quantity),
  //         product: detail.product,
  //       });
  //       newInventory.push(newInventoryItem);
  //     }
  //   }

  //   await this.inventoryRepositorySave.save(newInventory);
  // }

  // async registerSaleInventory(sale: any) {
  //   const { saleDetails } = sale;

  //   for (const detail of saleDetails) {
  //     const findProduct = await this.inventoryRepositorySave.findOne({
  //       where: { product: { id: detail.product } },
  //     });

  //     if (findProduct) {
  //       findProduct.stock -= detail.quantity;
  //       await this.inventoryRepositorySave.save(findProduct);
  //     }
  //   }
  // }
}
