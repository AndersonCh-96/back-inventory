import express from "express";
import Container from "typedi";
import { PurchaseController } from "../controllers/purchase.controller";

export const route_purchase = express.Router();

const purchaseController = Container.get(PurchaseController);

route_purchase.get(
  "",
  purchaseController.getAllPurchases.bind(purchaseController)
);

route_purchase.get(
  "/total-purchase",
  purchaseController.getTotalPurchase.bind(purchaseController)
);

route_purchase.get(
  "/:id",
  purchaseController.getPurchaseDetails.bind(purchaseController)
);

route_purchase.post(
  "/create",
  purchaseController.createPurchase.bind(purchaseController)
);
