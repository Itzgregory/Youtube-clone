import { Router } from 'express'
export const commentsRouter  = Router()
import {Request, Response} from 'express'
 const { commentsController } = require('../../controllers')
 
commentsRouter.post('/comments/get/:videoId', commentsController.getComments)
commentsRouter.post('/comments/set/:videoId', commentsController.setComment)


