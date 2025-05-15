import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ProviderService } from "../services/provider.service";

@Service()
export class ProviderController {
  @Inject()
  private providerService!: ProviderService;
  async getAllProvider(req: Request, resp: Response) {
    try {
      const providerData = await this.providerService.getAllProvider();
      resp.status(200).send(providerData);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async createProvider(req: Request, resp: Response) {
    try {
      const requesData = req.body;
      const saveProvider = await this.providerService.createProvider(
        requesData
      );
      resp.status(200).send(saveProvider);
    } catch (error: any) {
      resp.send(error.message);
    }
  }

  async updateProvider(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const provider = req.body;

      const updateProvider = await this.providerService.updateProvider(
        id,
        provider
      );
      resp.status(200).send(updateProvider);
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }

  async deleteProvider(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const deleteProvider = await this.providerService.deleteProvider(id);
      resp.status(200).send("OK");
    } catch (error: any) {
      resp.status(400).send(error.message);
    }
  }
}
