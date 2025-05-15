import { Response, Request } from "express";
import { Inject, Service } from "typedi";
import { CustomerService } from "../services/customer.service";

@Service()
export class CustomerController {
  @Inject()
  private customerService!: CustomerService;
  async getAllCustomer(req: Request, resp: Response) {
    try {
      const customer = await this.customerService.getAllCustomer();
      resp.status(200).send(customer);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async createCustomer(req: Request, resp: Response) {
    try {
      const customer = req.body;
      const saveCustomer = await this.customerService.createCustomer(customer);
      resp.status(200).send(saveCustomer);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async updateCustomer(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const customer = req.body;

      const updateCustomer = await this.customerService.updateCustomer(
        id,
        customer
      );
      resp.status(200).send(updateCustomer);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async deleteCustomer(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const customer = await this.customerService.deleteCustomer(id);
      resp.status(200).send(customer);
    } catch (error: any) {
      resp.send(error.message);
    }
  }
}
