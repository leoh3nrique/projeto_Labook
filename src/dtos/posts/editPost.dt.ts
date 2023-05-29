import { z } from "zod"

export interface EditPostInputDto{
    token:string
    id:string
    content:string
    
}

export interface EditPostOutputDto{
    content:string
}

export const EditPostSchema = z.object({
    token:z.string().min(1),
    id:z.string().min(1),
    content:z.string().min(1)
}).transform(data => data as EditPostInputDto)

