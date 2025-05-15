import express from "express";
import Container from "typedi";
import { CreditController } from "../controllers/credit.controller";

export const route_credit = express.Router();

const creditController = Container.get(CreditController);
route_credit.get("/", creditController.getAllCredits.bind(creditController));
route_credit.get(
  "/total-credits",
  creditController.totalCredits.bind(creditController)
);
route_credit.get(
  "/:id",
  creditController.getAllCreditsByCustomer.bind(creditController)
);
