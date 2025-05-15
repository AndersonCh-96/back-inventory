import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { PaymentService } from "../services/payment.service";

@Service()
export class PaymentController {
  @Inject()
  private paymentService!: PaymentService;
  async createPayment(req: Request, resp: Response) {
    try {
      const paymentRequest = req.body;
      const savePayment = await this.paymentService.createPayment(
        paymentRequest
      );
      resp.status(200).send(savePayment);
    } catch (error: any) {
      resp.status(400).json(error.message);
    }
  }
}
