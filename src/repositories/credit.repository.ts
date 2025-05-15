import AppDataSource from "../database/db";
import { Credit } from "../entities/credits.entity";

export const creditRepository = AppDataSource.getRepository(Credit);
