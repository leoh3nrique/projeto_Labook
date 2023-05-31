import { z } from "zod"

export interface LikesDislikesInputDto{
    id:string,
    token:string,
    like:boolean
}

export interface LikesDislikesOutputDto{
    like:boolean
}

export interface LikesDislikesDB{
    post_id:string
    user_id:string,
    like:boolean
}

export const LikesDislikesSchema = z.object({
    id:z.string().min(1),
    token:z.string().min(1),
    like:z.boolean()
}).transform(data => data as LikesDislikesInputDto)