import { Service } from "typedi";
import { saleRepository } from "../repositories/sale.repository";
import { saleDetailRepository } from "../repositories/saleDetail.repository";
import { Inventory } from "../entities/inventory.entity";
import { InventoryMovement, Type } from "../entities/inventoryMovements.entity";
import { Sale } from "../entities/sale.entity";
import AppDataSource from "../database/db";

@Service()
export class SaleService {
  async getAllSales() {
    return await saleRepository.find();
  }

  async getSaleDetail(id: string) {
    const findSale = await saleRepository.findOne({
      where: { id: id },
      relations: [
        "saleDetails",
        "customer",
        "payments",
        "credits",
        "saleDetails.product",
      ],
    });
    return findSale;

    // const saleDetail = await saleDetailRepository.find({
    //   where: { sale: { id: id } },
    //   relations: ["product"],
    // });

    // return saleDetail;
  }

  // async createSale(sale: any) {
  //   const { customer, saleDetails, notes, date } = sale;

  //   let total1 = 0;
  //   let tax1 = 0;

  //   const saleDetailsArray = saleDetails.map((detail: any) => {
  //     const subtotal = parseFloat(
  //       (detail.quantity * detail.unitCost).toFixed(2)
  //     );
  //     const taxAmount = parseFloat(
  //       (subtotal * (detail.taxPercentage / 100)).toFixed(2)
  //     );

  //     total1 += subtotal;
  //     tax1 += taxAmount;

  //     return {
  //       quantity: detail.quantity,
  //       product: detail.product,
  //       unitCost: detail.unitCost,
  //       taxPercentage: detail.taxPercentage,
  //       subtotal,
  //       tax: taxAmount,
  //     };
  //   });

  //   let payment = 0;
  //   const creditArray: any[] = [];
  //   const paymentArray: any[] = [];

  //   for (const methodPayment of sale.paymentMethods) {
  //     payment += Number(methodPayment.amount);
  //     if (methodPayment.type === "Credit") {
  //       const newCredit = {
  //         totalAmount: methodPayment.amount,
  //         dueAmount: methodPayment.amount,
  //         customer: customer,
  //         dueDate: methodPayment.dueDate,
  //         paidAmount: 0,
  //       };
  //       creditArray.push(newCredit);
  //     } else {
  //       const newPayment = {
  //         amount: methodPayment.amount,
  //         type: methodPayment.type,
  //       };
  //       paymentArray.push(newPayment);
  //     }
  //   }

  //   if (payment !== total1) {
  //     throw new Error("La cantidad del pago no coincide con la deuda");
  //   }

  //   const saleObject = saleRepository.create({
  //     date: date,
  //     notes: notes,
  //     subtotal: total1,
  //     total: total1,
  //     tax: tax1,
  //     customer: customer,
  //     saleDetails: saleDetailsArray,
  //     payments: paymentArray,
  //     credits: creditArray,
  //   });

  //   return await saleRepository.save(saleObject);
  // }

  async getTotalSales() {
    return await saleRepository
      .createQueryBuilder("s")
      .select("COALESCE(SUM(s.total), 0)", "totalVentas")
      .getRawOne();
  }
  //COn transacciones
  async createSale(sale: any) {
    const { customer, saleDetails, notes, date } = sale;

    let total1 = 0;
    let tax1 = 0;

    const saleDetailsArray = saleDetails.map((detail: any) => {
      const subtotal = parseFloat(
        (detail.quantity * detail.unitCost).toFixed(2)
      );
      const taxAmount = parseFloat(
        (subtotal * (detail.taxPercentage / 100)).toFixed(2)
      );

      total1 += subtotal;
      tax1 += taxAmount;

      return {
        quantity: detail.quantity,
        product: detail.product,
        unitCost: detail.unitCost,
        taxPercentage: detail.taxPercentage,
        subtotal,
        tax: taxAmount,
      };
    });

    let payment = 0;
    const creditArray: any[] = [];
    const paymentArray: any[] = [];

    for (const methodPayment of sale.paymentMethods) {
      payment += Number(methodPayment.amount);
      if (methodPayment.type === "Credit") {
        const newCredit = {
          totalAmount: methodPayment.amount,
          dueAmount: methodPayment.amount,
          customer: customer,
          dueDate: methodPayment.dueDate,
          paidAmount: 0,
        };
        creditArray.push(newCredit);
      } else {
        const newPayment = {
          amount: methodPayment.amount,
          type: methodPayment.type,
        };
        paymentArray.push(newPayment);
      }
    }

    if (payment !== total1) {
      throw new Error("La cantidad del pago no coincide con la deuda");
    }

    return await AppDataSource.transaction(async (manager) => {
      const saleObject = manager.create(Sale, {
        date: date,
        notes: notes,
        subtotal: total1,
        total: total1,
        tax: tax1,
        customer: customer,
        saleDetails: saleDetailsArray,
        payments: paymentArray,
        credits: creditArray,
      });

      const savedSale = await manager.save(Sale, saleObject);

      // Actualizamos inventario y registramos movimiento por cada producto vendido
      for (const detail of saleDetails) {
        const productId = detail.product;
        const quantity = detail.quantity;

        const inventory = await manager.findOne(Inventory, {
          where: { product: { id: productId } },
          relations: ["product"],
        });

        if (!inventory || inventory.stock < quantity) {
          throw new Error(
            `Stock insuficiente para el producto ${detail.product.name}`
          );
        }

        inventory.stock -= quantity;
        await manager.save(Inventory, inventory);

        const movement = manager.create(InventoryMovement, {
          product: { id: productId },
          quantity,
          type: Type.Exit,
          note: "Venta",
        });

        await manager.save(InventoryMovement, movement);
      }

      return savedSale;
    });
  }
}
