import express from "express";
import Container from "typedi";
import { PostController } from "../controllers/post.controller";
export const post_router = express.Router();

const postController = Container.get(PostController);
post_router.get("/", postController.getAllPost.bind(postController));
post_router.get("/:id", postController.getOnePost.bind(postController));
post_router.post("/create", postController.createPost.bind(postController));
post_router.put("/:id", postController.updatePost.bind(postController));
post_router.delete("/:id", postController.deletePost.bind(postController));
