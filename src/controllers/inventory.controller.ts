import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import InventoryService from "../services/inventory.service";

@Service()
export class InventoryController {
  @Inject()
  private inventoryService!: InventoryService;

  async createAdjustment(req: Request, resp: Response) {
    try {
      const data = req.body;

      const entryAdjustment = this.inventoryService.createAdjustment(data);
      resp.status(200).send(entryAdjustment);
    } catch (error) {
      resp.status(400).send(error);
    }
  }
  async getAllInventory(req: Request, resp: Response) {
    try {
      const inventory = await this.inventoryService.getAllInventory();
      resp.status(200).send(inventory);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }
}
