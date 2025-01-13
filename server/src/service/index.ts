const Dao = require('../dal/dao')
import commentsService from './comments/comments'
import subscriptionService from './subscription/subscription'
import videoService from './videos/videos'
const { videoDao, subscriptionDao, commentsDao } = Dao

export = {
    videoService: videoService(videoDao),
    subscriptionService: subscriptionService(subscriptionDao),
    commentsService: commentsService(commentsDao)

}