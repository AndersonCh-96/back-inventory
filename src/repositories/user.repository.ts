import AppDataSource from "../database/db";
import { User } from "../entities/user.entity";

export const userRepository=AppDataSource.getRepository(User)