import AppDataSource from "../database/db";
import { Payment } from "../entities/payment.entity";

export const paymentRepository = AppDataSource.getRepository(Payment);
