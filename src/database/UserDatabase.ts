import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public async getUsers() {
        const request = await BaseDatabase.connection("users")

        return request
    }
}