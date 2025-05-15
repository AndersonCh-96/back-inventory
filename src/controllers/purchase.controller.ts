import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { PurchaseService } from "../services/purchase.service";

@Service()
export class PurchaseController {
  @Inject()
  private purchaseService!: PurchaseService;

  async getAllPurchases(req: Request, resp: Response) {
    try {
      const purchases = await this.purchaseService.getAllPurchases();
      resp.status(200).send(purchases);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }

  async getTotalPurchase(req: Request, resp: Response) {
    try {
      const data = await this.purchaseService.getTotalPurchase();
      resp.status(200).send(data);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }
  async getPurchaseDetails(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const purchase = await this.purchaseService.getPurchaseDetails(id);
      resp.status(200).send(purchase);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }
  async createPurchase(req: Request, resp: Response) {
    try {
      const entryData = req.body;
      const savePurchase = await this.purchaseService.createPurchase(entryData);
      resp.status(200).send(savePurchase);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }
}
