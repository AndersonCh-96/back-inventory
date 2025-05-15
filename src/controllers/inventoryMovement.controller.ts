import { Inject, Service } from "typedi";

import { Request, Response } from "express";
import { InventoryMovementService } from "../services/inventoryMovement.service";

@Service()
export class InventoryMovementController {
  @Inject()
  private inventoryMovementsService!: InventoryMovementService;

  async getAllInventoryMovements(req: Request, resp: Response) {
    try {
      const inventoryMovements =
        await this.inventoryMovementsService.getAllInventoryMovement();

      resp.status(200).send(inventoryMovements);
    } catch (error) {
      resp.status(400).json(error);
    }
  }
}
