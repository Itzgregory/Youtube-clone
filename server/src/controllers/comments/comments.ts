import { StatusCodes } from "http-status-codes"
import { commentsService } from "../../interface"
import { Request, Response } from 'express'

const commentsController = (commentsService: commentsService) => {

    return {
        setComment: async (req: Request, res: Response) => {
            const { videoId } = req.params
            const comment = await commentsService.setVideoCommentService(videoId, req.body)
            if (!comment) {
                res.status(StatusCodes.BAD_REQUEST).send('an error ocurred')
            }
            res.status(StatusCodes.OK).send(comment)
        },
        getComments: async (req: Request, res: Response) => {
            const {videoId} = req.params
            const videos = await commentsService.getCommentsService(videoId)

            if (!videos) {
                res.status(StatusCodes.BAD_REQUEST).send('an error occurred while searching for videos')
            }
            res.status(StatusCodes.OK).send(videos)
        }
    }
}

export = commentsController