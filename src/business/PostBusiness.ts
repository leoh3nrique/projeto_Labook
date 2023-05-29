import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDto } from "../dtos/posts/createPost.dto";
import { DeletePostInputDto } from "../dtos/posts/deletePost.dto";
import { EditPostInputDto, EditPostOutputDto } from "../dtos/posts/editPost.dt";
import { GetPostInputDto, GetPostOutputDto } from "../dtos/posts/getPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post, PostDb } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }
    public getPosts = async (input: GetPostInputDto): Promise<GetPostOutputDto[]> => {
        const { token } = input

        const getPayload = this.tokenManager.getPayload(token)

        if (getPayload === null) {
            throw new BadRequestError("token inválido")
        }
        const data = await this.postDatabase.getPosts()

        if (!data) {
            throw new NotFoundError("Não foi encontrado nenhum post desse usuario")
        }

        const post: Post[] = data.map((post) => new Post(
            post.id,
            post.creator_id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.update_at
        ))

        const output: GetPostOutputDto[] = []

        for (const elem of post) {
            const getPostOutput: GetPostOutputDto = {
                id: elem.getId(),
                content: elem.getContent(),
                likes: elem.getLikes(),
                dislikes: elem.getDislikes(),
                createdAt: elem.getCreatedAt(),
                updatedAt: elem.getUpdatedAt(),
                creator: {
                    id: elem.getCreatorId(),
                    name: getPayload.name
                }

            };

            output.push(getPostOutput);
        }

        return output
    }
    
    public createPost = async (input: CreatePostInputDto) => {
        const { content, token } = input

        const id = this.idGenerator.generate()

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const post = new Post(
            id,
            payload.id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const postDB: PostDb = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            update_at: post.getUpdatedAt()
        }

        await this.postDatabase.createPost(postDB)


    }
    public editPost = async (input: EditPostInputDto): Promise<EditPostOutputDto> => {
        const { token, id, content } = input

        const getPayload = this.tokenManager.getPayload(token)

        if (getPayload === null) {
            throw new BadRequestError("Token invalido")
        }

        const [data] = await this.postDatabase.findPostByPostId(id)

        if (!data) {
            throw new NotFoundError("Post não encontrado")
        }

        if (data.creator_id !== getPayload.id) {
            throw new BadRequestError("Não tem acesso para editar esse post")
        }

        const updatedPost = new Post(
            data.id,
            data.creator_id,
            content,
            data.likes,
            data.dislikes,
            data.created_at,
            new Date().toISOString()
        )
        const updatedPostDB: PostDb = {
            id: updatedPost.getId(),
            creator_id: updatedPost.getCreatorId(),
            content: updatedPost.getContent(),
            likes: updatedPost.getLikes(),
            dislikes: updatedPost.getDislikes(),
            created_at: updatedPost.getCreatedAt(),
            update_at: updatedPost.getUpdatedAt()
        }

        await this.postDatabase.updatePost(updatedPostDB, id)

        const output: EditPostOutputDto = {
            content: content
        }
        return output
    }

    public deletePost = async (input: DeletePostInputDto) => {
        const { token, id } = input
        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const [postDB] = await this.postDatabase.findPostByPostId(id)

        if (!postDB) {
            throw new NotFoundError("Post com esse id não encontrado")
        }

        if (postDB.creator_id !== payload.id && payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequestError("Você não pode excluir essas informacoes")
        }

        await this.postDatabase.deletePost(id)


    }
}