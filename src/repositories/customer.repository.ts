import AppDataSource from "../database/db";
import { Customer } from "../entities/customer.entity";

export const customerRepository = AppDataSource.getRepository(Customer);
