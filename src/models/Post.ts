export interface PostDb {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string
}

export interface PostDbWithCreatorName{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    update_at: string,
    creator_id: string,
    creator_name:string
}


export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updateAt: string
    creator: {
        creatorId: string,
        creatorName: string
    }
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updateAt: string,
        private creatorId: string,
        private creatorName: string
    ) { }

    public getId(): string {
        return this.id
    }
    public setId(value: string): void {
        this.id = value
    }
    public getCreatorId(): string {
        return this.creatorId
    }
    public setCreatorId(value: string): void {
        this.creatorId = value
    }
    public getCreatorName(): string {
        return this.creatorName
    }
    public setCreatorName(value: string): void {
        this.creatorName = value
    }
    public getContent(): string {
        return this.content
    }
    public setContent(value: string): void {
        this.content = value
    }
    public getLikes(): number {
        return this.likes
    }
    public setLikes(value: number): void {
        this.likes = value
    }
    public getDislikes(): number {
        return this.dislikes
    }
    public setDislikes(value: number): void {
        this.dislikes = value
    }
    public getCreatedAt(): string {
        return this.createdAt
    }
    public setCreatedAt(value: string): void {
        this.createdAt = value
    }
    public getUpdatedAt(): string {
        return this.updateAt
    }
    public setUpdatedAt(value: string): void {
        this.updateAt = value
    }
    public toDBModel() {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            update_at: this.updateAt
        }
    }

    public toModel() {
        return {
            id: this.id,
            content:this.content,
            likes:this.likes,
            dislikes:this.dislikes,
            createdAt:this.createdAt,
            updateAt:this.updateAt,
            creator: {
                creatorId:this.creatorId ,
                creatorName:this.creatorName 
            }

        }
    }
}

