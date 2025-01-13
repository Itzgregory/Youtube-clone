import { commentsDao, User } from "../../interface"

const commentsService = ( commentsDao: commentsDao ) => {
  
    return{
        setVideoCommentService: async(postId: string, {content , writer}: {content: string, writer: User}) => {
            return await commentsDao.setVideoComment(content, writer, postId)
        },
        getCommentsService: async(postId :string) => {         
            return await commentsDao.getComments(postId)
        },
        deleteComments: async({videoId}: {videoId: string}) => {
            return await commentsDao.deleteComments(videoId)
        }
    }
}

export =  commentsService