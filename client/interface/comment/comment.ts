import { User } from "../user/user"
import { video } from "../videos/videos"

export interface comment{
    _id: string
    content: string,
    writer: User
    postId: video
    createdAt:string,
    updatedAt: string,
}