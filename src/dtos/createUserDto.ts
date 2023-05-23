import { z } from "zod"

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        created_at: string
    }
}

export const CreateUserSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(2),
    email: z.string(),
    password: z.string().min(4).max(12),
    role: z.string().min(3)
}).transform(data => data as CreateUserInputDTO)