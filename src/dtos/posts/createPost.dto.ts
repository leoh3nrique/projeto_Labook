import { z } from "zod"

export interface CreatePostInputDto{
    content:string,
    token:string
}

export const CreatePostSchema = z.object({
    content:z.string().min(3),
    token:z.string()
}).transform(data => data as CreatePostInputDto)