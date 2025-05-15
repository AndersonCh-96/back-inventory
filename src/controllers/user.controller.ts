import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserService } from "../services/user.service";
import { validationResult } from "express-validator";

@Service()
export class UserController {
  @Inject()
  private userService!: UserService;

  async getAllUser(req: Request, resp: Response) {
    try {
      const data = await this.userService.getAllUser();

      resp.status(200).send(data);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async getOneUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const userData = await this.userService.getOneUser(id);
      resp.status(200).send(userData);
    } catch (error: any) {
      resp.status(404).send(error.message);
    }
  }

  async createUser(req: Request, resp: Response) {
    try {
      // const error = validationResult(req);
      // if (!error.isEmpty()) {
      //   resp.json({
      //     error: true,
      //     errors: error.array(),
      //     message: "Tiene algunos errores",
      //   });
      // }
      const user = req.body;
      await this.userService.createUser(user);
      resp.status(200).send("Ok");
    } catch (error: any) {
      resp.status(400).json(error.message);
    }
  }

  async updateUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      const user = req.body;
      const update = await this.userService.updateUser(id, user);
      resp.status(200).json(update);
    } catch (error: any) {
      resp.status(404).send(error.message);
    }
  }

  async deleteUser(req: Request, resp: Response) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      resp.status(200).send("ok");
    } catch (error: any) {
      resp.status(404).send(error.message);
    }
  }
}
