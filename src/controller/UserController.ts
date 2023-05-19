import { UserBusiness } from "../business/UserBusiness"
import express, { Request, Response } from "express"


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }
    public getUsers = async (req: Request, res: Response) => {
        try {
            const output = this.userBusiness.getUsers()

            res.status(200).send(output)




        } catch (error) {
            console.log(error)

        }
    }
}