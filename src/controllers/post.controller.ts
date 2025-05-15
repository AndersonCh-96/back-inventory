import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { PostService } from "../services/post.service";
@Service()
export class PostController {
    @Inject()
    private postService!:PostService;


    
async getAllPost(req:Request,resp:Response){
    try {
        const posts=  await this.postService.getAllPosts()
        resp.status(200).send(posts)
        
    } catch (error:any) {
    
        resp.status(404).send(error.message)
        
    }

}

async getOnePost (req:Request,resp:Response){
    try {
        const {id}= req.params
        const post= await this.postService.getOnePost(id)
        resp.status(200).send(post)
     
    } catch (error:any) {
        
        resp.status(404).send(error.message)
    }

}

async createPost(req:Request,resp:Response){
    try {
        const post=req.body
         await this.postService.createPost(post)
        resp.status(200).send('Ok')
        
    } catch (error:any) {
        resp.status(500).send(error.message)
    }
}


async updatePost(req:Request,resp:Response){

    try {
        const {id}= req.params
        const post = req.body
        const  updataData= this.postService.updatePost(id,post)
        resp.status(200).json({data:updataData})
        
    } catch (error:any) {
        resp.status(500).send(error.message)
    }

}

async deletePost(req:Request,resp:Response){

    try {
        const {id}= req.params
        const data= this.postService.deletePost(id)
        resp.status(200).send('ok')
        
    } catch (error:any) {
    resp.status(500).send(error.message)
    }

}

}