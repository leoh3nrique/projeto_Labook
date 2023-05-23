import { UserBusiness } from "../business/UserBusiness"
import express, { Request, Response } from "express"
import { CreateUserSchema } from "../dtos/createUserDto"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }
    public getUsers = async (req: Request, res: Response) => {
        try {
            const output = await this.userBusiness.getUsers()
            console.log(output)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
        }
    }
    public createUser = async (req: Request, res: Response) => {

        try {
            const input = CreateUserSchema.parse({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            })

            const output = await this.userBusiness.createUsers(input)
            res.status(201).send(output)
            
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

}