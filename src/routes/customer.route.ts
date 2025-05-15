import express from "express";
import Container from "typedi";
import { CustomerController } from "../controllers/customer.controller";
export const customer_route = express.Router();

const customerController = Container.get(CustomerController);
customer_route.get(
  "/",
  customerController.getAllCustomer.bind(customerController)
);

customer_route.post(
  "/create",
  customerController.createCustomer.bind(customerController)
);

customer_route.put(
  "/:id",
  customerController.updateCustomer.bind(customerController)
);

customer_route.delete(
  "/:id",
  customerController.deleteCustomer.bind(customerController)
);
