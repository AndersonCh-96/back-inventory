import { Service } from "typedi";
import { inventoryMovementRepository } from "../repositories/inventoryMovements.repository";

@Service()
export class InventoryMovementService {
  async getAllInventoryMovement() {
    return await inventoryMovementRepository.find({
      relations: ["product"],
      order: { createdAt: "DESC" },
    });
  }
}
