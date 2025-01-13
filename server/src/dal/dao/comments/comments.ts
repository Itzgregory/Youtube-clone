import { Error, Models } from "mongoose"
import { User } from "../../../interface"

const commentsDao = (model: Models) => {
    const { commentsModel } = model
    return {
        setVideoComment: async (content: string, writer: User, postId: string) => {
            const comment = new commentsModel({
                content: content,
                writer: writer._id,
                postId: postId

            })
            await comment.save()
            const video = await commentsModel.find({ '_id': comment._id })
                .populate('writer')
                .exec()
            return video
        },
        getComments: async (postId: string) => {           
            const videos = commentsModel.find({ postId: postId })
                .populate('writer')
                .exec()
            return videos
        },
        deleteComments: async(postId: string) => {
            const deleteComments = commentsModel.deleteMany({postId: postId})
            return deleteComments
        }
    }
}

export = commentsDao