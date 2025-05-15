import AppDataSource from "../database/db";
import { Provider } from "../entities/provider";
export const providerRepository = AppDataSource.getRepository(Provider);
