import express from "express";
import Container from "typedi";
import { PaymentController } from "../controllers/payment.controller";

export const payment_route = express.Router();

const paymentController = Container.get(PaymentController);

payment_route.post(
  "/create",
  paymentController.createPayment.bind(paymentController)
);
