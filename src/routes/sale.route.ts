import express from "express";
import Container from "typedi";
import { SaleController } from "../controllers/sale.controller";

export const sale_route = express.Router();

const saleController = Container.get(SaleController);

sale_route.get("/", saleController.getAllSales.bind(saleController));
sale_route.get("/:id", saleController.getSaleDetail.bind(saleController));
sale_route.post("/create", saleController.createSale.bind(saleController));
