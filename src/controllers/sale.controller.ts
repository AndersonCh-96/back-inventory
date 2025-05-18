import { Inject, Service } from "typedi";
import { SaleService } from "../services/sale.service";
import { Request, Response } from "express";

@Service()
export class SaleController {
  @Inject()
  private saleService!: SaleService;
  async getAllSales(req: Request, resp: Response) {
    try {
      const sales = await this.saleService.getAllSales();
      resp.status(200).send(sales);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async getTotalSales(req: Request, resp: Response) {
    try {
      const data = await this.saleService.getTotalSales();
      resp.status(200).send(data);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }

  async getSaleDetail(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const sale = await this.saleService.getSaleDetail(id);
      resp.status(200).send(sale);
    } catch (error: any) {
      resp.status(400).json(error.message);
    }
  }

  async createSale(req: Request, resp: Response) {
    try {
      const saleData = req.body;
      const sale = await this.saleService.createSale(saleData);
      resp.status(200).send(sale);
    } catch (error: any) {
      resp.status(400).json(error.message);
    }
  }
}
