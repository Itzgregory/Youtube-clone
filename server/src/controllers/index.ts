import userControllers from './user/user'
import videoControllers = require('./videos/videos')

import service from '../service'
import subscriptionController = require('./subscription/subscription')
import commentsController = require('./comments/comments')

const { videoService, subscriptionService, commentsService } = service

export = {
    userControllers: userControllers(),
    videoControllers: videoControllers(videoService, subscriptionService, commentsService),
    subscriptionControllers: subscriptionController(subscriptionService),
    commentsController: commentsController(commentsService)
}
