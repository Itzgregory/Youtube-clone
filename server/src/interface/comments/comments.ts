import { Models } from "mongoose";

export interface commentsDao{
    setVideoComment: Function,
    getComments: Function,
    deleteComments: Function
}

export interface commentsService{
    setVideoCommentService: Function
    getCommentsService: Function,
    deleteComments: Function
}

export interface Comment {
    _id: string,
    content: string,
    writer: Models,
    postId: Models,
}