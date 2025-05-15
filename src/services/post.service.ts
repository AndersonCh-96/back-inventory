import { Service } from "typedi";
import { postRepository } from "../repositories/post.repository";
import { Post } from "../entities/post.entity";

@Service()
export class PostService {
    async getAllPosts(){
    return await postRepository.find({relations:['user']})
    }

    async getOnePost (id:string){
        const findPost= await postRepository.findOne({where:{id:id},relations:['user']})
        if (!findPost) {
            throw new Error('Not found post')
        }
        return findPost
    }


    async createPost(post:Post){
        await postRepository.save(post)
    }

    async updatePost(id:string,post:Post){

       const findPost= await postRepository.findOne({where:{id:id}})
       if (!findPost) {
        throw new Error('Post not found')
       }
       return await postRepository.update(findPost, post)


    }

    async deletePost(id:string){
        const data= await postRepository.findOne({where:{id:id}})
        if(!data){
            throw new Error('Post not found')
        }
        return await postRepository.delete(id)
    }
}