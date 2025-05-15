import { Service } from "typedi";
import { purchaseRepository } from "../repositories/purchse.repository";
import { purchaseDetailRepository } from "../repositories/purchaseDetail.repository";
import { DataSource } from "typeorm";
import AppDataSource from "../database/db";
import { Purchase } from "../entities/purchase.entity";
import { Inventory } from "../entities/inventory.entity";
import { InventoryMovement, Type } from "../entities/inventoryMovements.entity";

@Service()
export class PurchaseService {
  // constructor(private dataSource: DataSource) {}
  async getAllPurchases() {
    return await purchaseRepository.find({
      order: { createdAt: "DESC" },
      relations: ["provider"],
    });
  }

  async getPurchaseDetails(id: string) {
    const purchaseDetail = await purchaseRepository.findOne({
      where: { id: id },
      relations: ["provider", "purchaseDetails", "purchaseDetails.product"],
    });

    console.log("Purchase det", purchaseDetail);

    return purchaseDetail;
    // const findPurchase = await purchaseRepository.findOne({
    //   where: { id: id },
    //   relations: ["purchaseDetails"],
    // });
    // return findPurchase;
  }

  async getTotalPurchase() {
    return await purchaseRepository
      .createQueryBuilder("p")
      .select("COALESCE(SUM(p.total), 0)", "totalCompras")
      .getRawOne();
  }

  async createPurchase(purchase: any) {
    const { purchaseDetails, provider, date, notes } = purchase;

    let subtotal = 0;
    let tax = 0;

    const arrayDetail: any = [];

    //FOrma sugerida direactamente con las entidades

    return await AppDataSource.transaction(async (manager) => {
      for (const detail of purchaseDetails) {
        const itemTotal = detail.quantity * detail.price;

        const newObjectDetail = {
          quantity: detail.quantity,
          price: detail.price,
          total: itemTotal,
          product: detail.product,
        };
        arrayDetail.push(newObjectDetail);
        subtotal += itemTotal;
      }

      const totalFinal = subtotal;

      const purchaseObject = manager.create(Purchase, {
        date,
        subtotal,
        tax: 0,
        total: totalFinal,
        notes,
        provider,
        purchaseDetails: arrayDetail,
      });

      const savedPurchase = await manager.save(Purchase, purchaseObject);

      // Procesamos cada producto comprado
      for (const detail of purchaseDetails) {
        const product = detail.product;
        const quantity = detail.quantity;

        // Actualizar o crear stock en INVENTORY
        let inventory = await manager.findOne(Inventory, {
          where: { product: { id: product } },
          relations: ["product"],
        });

        if (inventory) {
          inventory.stock += quantity;
        } else {
          inventory = manager.create(Inventory, {
            product: { id: product },
            stock: quantity,
          });
        }

        console.log("Inventario", inventory);
        console.log("COmpra", savedPurchase);
        await manager.save(Inventory, inventory);

        // Registrar MOVIMIENTO tipo "entry"
        const movement = manager.create(InventoryMovement, {
          product: { id: product },
          quantity,
          type: Type.Entry,
          note: "compra",
        });

        // console.log("DDD")

        await manager.save(InventoryMovement, movement);
      }

      return savedPurchase;
    });
    //FOrma 2 con subscribers

    // for (const detail of purchaseDetails) {
    //   const itemTotal = detail.quantity * detail.price;
    //   const newObjetctDetail = {
    //     quantity: detail.quantity,
    //     price: detail.price,
    //     total: itemTotal,
    //     product: detail.product,
    //   };
    //   arrayDetail.push(newObjetctDetail);

    //   subtotal += itemTotal;
    // }

    // const totalFinal = subtotal;

    // const purchaseObject = {
    //   date,
    //   subtotal: subtotal,
    //   tax,
    //   total: totalFinal,
    //   notes,
    //   provider,
    //   purchaseDetails: arrayDetail,
    // };

    // return await purchaseRepository.save(purchaseObject);
  }
}
