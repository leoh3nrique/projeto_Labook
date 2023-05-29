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
    updatedAt:string
    creator:{
        id:string,
        name:string
    }
}

export const GetPostSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetPostInputDto)