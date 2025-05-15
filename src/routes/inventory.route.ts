import express from "express";
import Container from "typedi";
import { InventoryController } from "../controllers/inventory.controller";

export const route_inventory = express.Router();

const inventoryController = Container.get(InventoryController);

route_inventory.get(
  "/",
  inventoryController.getAllInventory.bind(inventoryController)
);
route_inventory.post(
  "/adjustment",
  inventoryController.createAdjustment.bind(inventoryController)
);
