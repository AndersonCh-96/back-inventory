import { Request, Response } from "express";
import { Service, Inject } from "typedi";
import { AuthService } from "../services/auth.service";

@Service()
export class AuthController {
  @Inject()
  private authService!: AuthService;

  async singInt(req: Request, res: Response) {
    try {
      const entryData = req.body;
      const userData = await this.authService.signIn(entryData);
      res.status(200).json(userData);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async register(req: Request, res: Response) {}
}
