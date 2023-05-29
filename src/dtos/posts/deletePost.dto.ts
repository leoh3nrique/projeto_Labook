import { z } from "zod"

export interface DeletePostInputDto{
    token:string
    id:string
}

export const DeletePostSchema = z.object({
    token:z.string().min(1),
    id:z.string().min(1)
}).transform(data => data as DeletePostInputDto)