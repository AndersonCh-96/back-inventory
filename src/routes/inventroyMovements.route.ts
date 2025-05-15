import express from "express";
import Container from "typedi";
import { InventoryMovementController } from "../controllers/inventoryMovement.controller";
export const route_inventoryMovements = express.Router();

const inventoryMovementController = Container.get(InventoryMovementController);

route_inventoryMovements.get(
  "/",
  inventoryMovementController.getAllInventoryMovements.bind(
    inventoryMovementController
  )
);
