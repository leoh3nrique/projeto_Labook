import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public async getUsers() {
        const request = await BaseDatabase.connection("users")

        return request
    }

    public async insertUser(newUser:UserDB){
        console.log(newUser)
        await BaseDatabase.connection("users").insert(newUser)
    }
}