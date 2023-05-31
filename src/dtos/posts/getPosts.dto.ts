import { z } from "zod"

export interface GetPostInputDto{
    token:string
}

export interface GetPostOutputDto{  
    id:string,
    content:string
    likes:number
    dislikes:number
    createdAt:string
    updateAt:string
    creator:{
        creatorId:string,
        creatorName:string
    }
}

export const GetPostSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetPostInputDto)