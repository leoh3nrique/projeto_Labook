import { z } from "zod"


export interface LoginInputDto{
    email:string,
    password:string
}

export interface LoginOutputDto{
    token:string
}

export const LoginSchema= z.object({
    email:z.string().email(),
    password:z.string().min(4)
})