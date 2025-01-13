import { Router } from 'express'
import { requireUser } from '../../middleware'
export const videoRouter  = Router()
const { videoControllers } = require('../../controllers')



videoRouter.post('/upload', requireUser,videoControllers.uploadVideo)
videoRouter.patch('/:videoId',  videoControllers.createElementsOfVideo)
videoRouter.get('/', videoControllers.findvideos)
videoRouter.get('/watch/:videoId', videoControllers.streamVideo)
videoRouter.get('/:videoId', videoControllers.getElementOfVideo)
videoRouter.patch('/comment/:videoId', videoControllers.addComentVideo)
videoRouter.patch('/views/:videoId', videoControllers.updateViewVideo)
videoRouter.post('/myvideos', videoControllers.findVideosByUser)
videoRouter.delete('/delete', videoControllers.deleteVideoById)
videoRouter.patch('/like/:videoId', videoControllers.updateLikeVideo)
videoRouter.patch('/published/update', videoControllers.updatePublished)
