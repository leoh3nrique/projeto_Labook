import { LikesDislikesDB } from "../dtos/posts/likesDislikes.dto";
import { PostDb, PostDbWithCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public async getPostsWithCreatorName (){
        const result = await BaseDatabase
        .connection("posts")
        .join("users","posts.creator_id","=","users.id")
        .select(
        "posts.id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.update_at",
        "posts.creator_id",
        "users.name as creator_name")
        return result as PostDbWithCreatorName[]
    }
    public async countHowMuchLikesHave (id:string){
        const [result] = await BaseDatabase.connection("likes_dislikes").count("* as contagem").where({post_id:id, like:1})
        return result 
    }
    public async countHowMuchDislikesHave (id:string){
        const [result] = await BaseDatabase.connection("likes_dislikes").count("* as contagem").where({post_id:id, like:0})
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

    public async createPost(input:PostDb):Promise<void> {
        await BaseDatabase.connection("posts").insert(input)
    }

    public async updatePost(updatedPost:PostDb, idToEdit:string){
        await BaseDatabase.connection("posts").update(updatedPost).where({id:idToEdit})
    }

    public async deletePost (idToDelete:string){
        await BaseDatabase.connection("posts").del().where({id:idToDelete})
    }


    public async findLikeInTableLikesByUserId (idToFind:string){
        const result = await BaseDatabase.connection("likes_dislikes").where({user_id:idToFind})
        return result
    }
    public async insertLikeInPost (input:LikesDislikesDB){
        await BaseDatabase.connection("likes_dislikes").insert(input)
    }

    public async editLikeInPostByUserId (like:boolean, id:string){
        await BaseDatabase.connection("likes_dislikes").update({like:like}).where({user_id:id})
    }

    public async deleteLikeFromTableLikes (id:string){
        await BaseDatabase.connection("likes_dislikes").del().where({user_id:id})
    }
   
}