import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDto } from "../dtos/posts/CreatePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Post, PostDb } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness{
    constructor(
        private postDatabase:PostDatabase,
        private idGenerator:IdGenerator,
        private tokenManager:TokenManager
    ){}
    public createPost = async(input:CreatePostInputDto) =>{
        const {content, token} = input

        const id = this.idGenerator.generate()

        const payload = this.tokenManager.getPayload(token) 

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

        const post = new Post(
            id,
            payload.id ,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const postDB:PostDb = {
            id:post.getId(),
            creator_id:post.getCreatorId(),
            content:post.getContent(),
            likes:post.getLikes(),
            dislikes:post.getDislikes(),
            created_at:post.getCreatedAt(),
            update_at:post.getUpdatedAt()
        }

        await this.postDatabase.createPost(postDB)
        

    }
}