import z from "zod"


export interface SignupInputDto{
    name:string,
    email:string,
    password:string
}

export interface SignupOutputDto{
    token:string
}

export const createSignupSchema = z.object({
    name:z.string().min(3).max(20),
    email:z.string().email(),
    password:z.string().min(6).max(12)
}).transform(data=> data as SignupInputDto)
