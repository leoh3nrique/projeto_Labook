import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { CreatePostSchema } from "../dtos/posts/createPost.dto"
import { PostBusiness } from "../business/PostBusiness"
import { GetPostSchema } from "../dtos/posts/getPosts.dto"
import { EditPostSchema } from "../dtos/posts/editPost.dt"
import { DeletePostSchema } from "../dtos/posts/deletePost.dto"
import { LikesDislikesSchema } from "../dtos/posts/likesDislikes.dto"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostSchema.parse({
                token : req.headers.authorization
            })
            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)
            

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                content:req.body.content,
                token:req.headers.authorization
            })

            await this.postBusiness.createPost(input)
            
            res.status(201).send("deu certo")

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = EditPostSchema.parse({
                token:req.headers.authorization,
                id:req.params.id,
                content:req.body.content
            })

            const output = await this.postBusiness.editPost(input)

            res.status(201).send(output)
        

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
           const input = DeletePostSchema.parse({
                token:req.headers.authorization,
                id:req.params.id
           })

           await this.postBusiness.deletePost(input)

           res.status(200).send("Excluido com sucesso")

            

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likesDislikes = async (req: Request, res: Response) => {
        try {
           const input = LikesDislikesSchema.parse({
                id:req.params.id,
                token:req.headers.authorization,
                like:req.body.like
           })
           const output = await this.postBusiness.getLikesDislikes(input)

           res.status(200).send(output)
        } catch (error) {
            console.log(error)
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