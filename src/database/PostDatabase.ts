import { PostDb } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{

    public async getPosts (){
        const result = await BaseDatabase.connection("posts")
        return result
    }

    public async findPostsByUserId(userId:string): Promise<PostDb[]>{
        const result = await BaseDatabase.connection("posts").where({creator_id:userId})
        return result
    }

    public async findPostByPostId(postId:string): Promise<PostDb[]>{
        const result = await BaseDatabase.connection("posts").where({id:postId})
        return result
    }

    public async createPost(input:PostDb) {
        await BaseDatabase.connection("posts").insert(input)
    }

    public async updatePost(updatedPost:PostDb, idToEdit:string){
        await BaseDatabase.connection("posts").update(updatedPost).where({id:idToEdit})
    }

    public async deletePost (idToDelete:string){
        await BaseDatabase.connection("posts").del().where({id:idToDelete})
    }
    

}