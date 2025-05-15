import { Service } from "typedi";

@Service()
export class InventoryMapp {
  public purchaseDetailToPersistence(raw: any): any {
    console.log("D", raw)
    return {
      product: raw.product,
      stock: raw.quantity,
      movementType: "entry",
    };
  }
}
