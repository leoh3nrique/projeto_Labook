import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDto } from "../dtos/posts/createPost.dto";
import { DeletePostInputDto } from "../dtos/posts/deletePost.dto";
import { EditPostInputDto, EditPostOutputDto } from "../dtos/posts/editPost.dt";
import { GetPostInputDto, GetPostOutputDto } from "../dtos/posts/getPosts.dto";
import { LikesDislikesDB, LikesDislikesInputDto, LikesDislikesOutputDto } from "../dtos/posts/likesDislikes.dto";
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
        private tokenManager: TokenManager,

    ) { }

    public getPosts = async (input: GetPostInputDto): Promise<GetPostOutputDto[]> => {
        const { token } = input

        const getPayload = this.tokenManager.getPayload(token)

        if (getPayload === null) {
            throw new BadRequestError("token inválido")
        }
        const data = await this.postDatabase.getPostsWithCreatorName()


        const posts = await Promise.all(
            data.map(async (post) => {
                const postWithCreatorName = new Post(
                    post.id,
                    post.content,
                    post.likes,
                    post.dislikes,
                    post.created_at,
                    post.update_at,
                    post.creator_id,
                    post.creator_name
                );
                const likeCount = await this.postDatabase.countHowMuchLikesHave(postWithCreatorName.getId());
                const dislikeCount = await this.postDatabase.countHowMuchDislikesHave(postWithCreatorName.getId());
                postWithCreatorName.setLikes(Number(likeCount.contagem));
                postWithCreatorName.setDislikes(Number(dislikeCount.contagem));
                return postWithCreatorName.toModel();
            })
        );

        const output: GetPostOutputDto[] = posts
        return output
    }

    public createPost = async (input: CreatePostInputDto) => {
        const { content, token } = input

        const id = this.idGenerator.generate()

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const newPostDb = (): PostDb => {
            const newPost = new Post(
                id,
                content,
                0,
                0,
                new Date().toISOString(),
                new Date().toISOString(),
                payload.id,
                payload.name

            )
            return newPost.toDBModel()
        }
        await this.postDatabase.createPost(newPostDb())
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


        const updatedPostDB = (): PostDb => {
            const post = new Post(
                data.id,
                content,
                data.likes,
                data.dislikes,
                data.created_at,
                new Date().toISOString(),
                data.creator_id,
                getPayload.name)
            return post.toDBModel()
        }


        await this.postDatabase.updatePost(updatedPostDB(), id)

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

    public getLikesDislikes = async (input: LikesDislikesInputDto): Promise<LikesDislikesOutputDto> => {
        const { id, token, like } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("token inválido")
        }
        const [postDb] = await this.postDatabase.findPostLikeByPostId(id)

        if (!postDb) {
            const [result] = await this.postDatabase.findPostByPostId(id)
            console.log(result)

            if (result.creator_id === payload.id) {
                throw new BadRequestError("Você nao pode dar like no seu propro post")
            }
            const input: LikesDislikesDB = {
                post_id: id,
                user_id: payload.id,
                like: like
            }
            await this.postDatabase.insertLikeInPost(input)
        } else {
            if (postDb.like === 1 && like === true) {
                await this.postDatabase.deletePostFromTable(postDb.post_id)
            }
            else if (postDb.like === 0 && like === false) {
                await this.postDatabase.deletePostFromTable(postDb.post_id)
            }
        }

        const output = {
            like: like
        }

        return output as LikesDislikesOutputDto

    }

}