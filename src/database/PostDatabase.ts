import { PostDb } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public async createPost(input:PostDb) {
        await BaseDatabase.connection("posts").insert(input)
    }


}