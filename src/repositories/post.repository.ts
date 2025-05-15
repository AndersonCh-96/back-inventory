import AppDataSource from "../database/db";
import { Post } from "../entities/post.entity";


export const postRepository= AppDataSource.getRepository(Post)