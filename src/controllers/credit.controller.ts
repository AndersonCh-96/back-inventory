import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { CreditService } from "../services/credit.service";

@Service()
export class CreditController {
  @Inject()
  private creditService!: CreditService;

  async getAllCredits(req: Request, resp: Response) {
    try {
      const credits = await this.creditService.getAllCredits();
      resp.status(200).send(credits);
    } catch (error: any) {
      resp.send(400).json(error.message);
    }
  }

  async getAllCreditsByCustomer(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const creditByCustomer = await this.creditService.getAllCreditsByCustomer(
        id
      );
      resp.status(200).send(creditByCustomer);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async totalCredits(req: Request, resp: Response) {
    try {
      const totalCredits = await this.creditService.totalCredits();
      resp.status(200).send(totalCredits);
    } catch (error) {
      resp.send(400).json(error);
    }
  }
}
